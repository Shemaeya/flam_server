import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AddToCartDto, UpdateCartItemDto, ApplyPromoCodeDto, CalculateDeliveryFeeDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: string) {
    try {
      // Récupérer le panier de l'utilisateur avec les articles
      const cart = await this.prisma.cart.findFirst({
        where: { userId },
        include: {
          items: {
            include: {
              product: {
                include: {
                  brand: true,
                  category: true,
                  type: true,
                },
              },
            },
          },
        },
        orderBy: { updatedAt: 'desc' },
      });

      if (!cart) {
        // Créer un nouveau panier vide si aucun n'existe
        return await this.createEmptyCart(userId);
      }

      // Calculer les totaux
      const totals = this.calculateCartTotals(cart.items);

      return {
        id: cart.id,
        userId: cart.userId,
        items: cart.items.map(item => ({
          id: item.id,
          productId: item.productId,
          quantity: item.quantity,
          itemType: item.itemType,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          product: item.product,
        })),
        subtotal: totals.subtotal,
        shippingCost: totals.shippingCost,
        tax: totals.tax,
        total: totals.total,
        promoCode: cart.promoCode,
        discount: cart.discount,
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt,
      };
    } catch (error) {
      console.error('Erreur lors de la récupération du panier:', error);
      throw new BadRequestException('Erreur lors de la récupération du panier');
    }
  }

  private async createEmptyCart(userId: string) {
    const cart = await this.prisma.cart.create({
      data: {
        userId,
        subtotal: 0,
        shippingCost: 0,
        tax: 0,
        total: 0,
        discount: 0,
      },
    });

    return {
      id: cart.id,
      userId: cart.userId,
      items: [],
      subtotal: 0,
      shippingCost: 0,
      tax: 0,
      total: 0,
      promoCode: null,
      discount: 0,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
    };
  }

  private calculateCartTotals(items: any[]) {
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const shippingCost = subtotal >= 50000 ? 0 : 2000; // Livraison gratuite au-dessus de 50000 FCFA
    const tax = Math.round(subtotal * 0.18); // TVA de 18%
    const total = subtotal + shippingCost + tax;

    return {
      subtotal,
      shippingCost,
      tax,
      total,
    };
  }

  async addToCart(userId: string, addToCartDto: AddToCartDto) {
    try {
      // Vérifier que le produit existe
      const product = await this.prisma.product.findUnique({
        where: { id: addToCartDto.productId },
        include: { brand: true, category: true, type: true },
      });

      if (!product) {
        throw new NotFoundException('Produit non trouvé');
      }

      // Récupérer ou créer le panier
      let cart = await this.prisma.cart.findFirst({
        where: { userId },
        include: { items: true },
      });

      if (!cart) {
        cart = await this.prisma.cart.create({
          data: {
            userId,
            subtotal: 0,
            shippingCost: 0,
            tax: 0,
            total: 0,
            discount: 0,
          },
          include: { items: true },
        });
      }

      // Calculer le prix unitaire selon le type
      const unitPrice = addToCartDto.itemType === 'PURCHASE' 
        ? Number(product.category.pricePurchase) 
        : Number(product.category.priceRefill);

      if (unitPrice <= 0) {
        throw new BadRequestException('Prix non disponible pour ce type d\'achat');
      }

      // Vérifier si l'article existe déjà dans le panier
      const existingItem = await this.prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId: addToCartDto.productId,
          itemType: addToCartDto.itemType,
        },
      });

      let cartItem;
      if (existingItem) {
        // Mettre à jour la quantité de l'article existant
        const newQuantity = existingItem.quantity + addToCartDto.quantity;
        cartItem = await this.prisma.cartItem.update({
          where: { id: existingItem.id },
          data: {
            quantity: newQuantity,
            totalPrice: unitPrice * newQuantity,
            updatedAt: new Date(),
          },
        });
      } else {
        // Créer un nouvel article
        cartItem = await this.prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId: addToCartDto.productId,
            quantity: addToCartDto.quantity,
            itemType: addToCartDto.itemType,
            selectedSize: addToCartDto.selectedSize,
            selectedColor: addToCartDto.selectedColor,
            unitPrice,
            totalPrice: unitPrice * addToCartDto.quantity,
          },
        });
      }

      // Recalculer les totaux du panier
      await this.updateCartTotals(cart.id);

      // Retourner le panier mis à jour
      return await this.getCart(userId);
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Erreur lors de l\'ajout au panier');
    }
  }

  async updateCartItem(userId: string, itemId: string, updateCartItemDto: UpdateCartItemDto) {
    try {
      // Récupérer le panier de l'utilisateur
      const cart = await this.prisma.cart.findFirst({
        where: { userId },
        include: { items: true },
      });

      if (!cart) {
        throw new NotFoundException('Panier non trouvé');
      }

      // Vérifier que l'article existe dans le panier avec le bon type
      const cartItem = await this.prisma.cartItem.findFirst({
        where: {
          id: itemId,
          cartId: cart.id,
          itemType: updateCartItemDto.itemType,
        },
      });

      if (!cartItem) {
        throw new NotFoundException('Article non trouvé dans le panier avec ce type');
      }

      // Récupérer le produit pour recalculer le prix unitaire selon le type
      const product = await this.prisma.product.findUnique({
        where: { id: cartItem.productId },
        include: { category: true },
      });

      if (!product) {
        throw new NotFoundException('Produit non trouvé');
      }

      // Calculer le nouveau prix unitaire selon le type
      const unitPrice = updateCartItemDto.itemType === 'PURCHASE' 
        ? Number(product.category.pricePurchase) 
        : Number(product.category.priceRefill);

      if (unitPrice <= 0) {
        throw new BadRequestException('Prix non disponible pour ce type d\'achat');
      }

      // Mettre à jour la quantité et le prix
      const updatedItem = await this.prisma.cartItem.update({
        where: { id: itemId },
        data: {
          quantity: updateCartItemDto.quantity,
          unitPrice,
          totalPrice: unitPrice * updateCartItemDto.quantity,
          updatedAt: new Date(),
        },
      });

      // Recalculer les totaux du panier
      await this.updateCartTotals(cart.id);

      // Retourner le panier mis à jour
      return await this.getCart(userId);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'article:', error);
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Erreur lors de la mise à jour de l\'article');
    }
  }

  async removeCartItem(userId: string, itemId: string) {
    try {
      // Récupérer le panier de l'utilisateur
      const cart = await this.prisma.cart.findFirst({
        where: { userId },
        include: { items: true },
      });

      if (!cart) {
        throw new NotFoundException('Panier non trouvé');
      }

      // Vérifier que l'article existe dans le panier
      const cartItem = await this.prisma.cartItem.findFirst({
        where: {
          id: itemId,
          cartId: cart.id,
        },
      });

      if (!cartItem) {
        throw new NotFoundException('Article non trouvé dans le panier');
      }

      // Supprimer l'article
      await this.prisma.cartItem.delete({
        where: { id: itemId },
      });

      // Recalculer les totaux du panier
      await this.updateCartTotals(cart.id);

      // Retourner le panier mis à jour
      return await this.getCart(userId);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'article:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erreur lors de la suppression de l\'article');
    }
  }

  async clearCart(userId: string) {
    try {
      // Récupérer le panier de l'utilisateur
      const cart = await this.prisma.cart.findFirst({
        where: { userId },
      });

      if (!cart) {
        return await this.createEmptyCart(userId);
      }

      // Supprimer tous les articles du panier
      await this.prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      // Réinitialiser les totaux
      await this.prisma.cart.update({
        where: { id: cart.id },
        data: {
          subtotal: 0,
          shippingCost: 0,
          tax: 0,
          total: 0,
          discount: 0,
          promoCode: null,
          updatedAt: new Date(),
        },
      });

      // Retourner le panier vide
      return await this.getCart(userId);
    } catch (error) {
      console.error('Erreur lors du vidage du panier:', error);
      throw new BadRequestException('Erreur lors du vidage du panier');
    }
  }

  private async updateCartTotals(cartId: string) {
    try {
      // Récupérer tous les articles du panier
      const items = await this.prisma.cartItem.findMany({
        where: { cartId },
      });

      // Calculer les totaux
      const totals = this.calculateCartTotals(items);

      // Mettre à jour le panier
      await this.prisma.cart.update({
        where: { id: cartId },
        data: {
          subtotal: totals.subtotal,
          shippingCost: totals.shippingCost,
          tax: totals.tax,
          total: totals.total,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour des totaux:', error);
      throw new BadRequestException('Erreur lors de la mise à jour des totaux');
    }
  }

  async getCartItemCount(userId: string) {
    try {
      const cart = await this.prisma.cart.findFirst({
        where: { userId },
        include: { items: true },
      });

      if (!cart) return 0;

      return cart.items.reduce((sum, item) => sum + item.quantity, 0);
    } catch (error) {
      console.error('Erreur lors du calcul du nombre d\'articles:', error);
      return 0;
    }
  }

  async calculateDeliveryFee(calculateDeliveryFeeDto: CalculateDeliveryFeeDto) {
    try {
      // Logique de calcul des frais de livraison
      const basePrice = 2000; // Prix de base en FCFA
      const urgentFee = 1000; // Frais d'urgence
      
      // Calculer les frais selon la zone et le montant
      let deliveryFee = basePrice;
      
      // Livraison gratuite si le montant est suffisant
      if (calculateDeliveryFeeDto.orderAmount >= 50000) {
        deliveryFee = 0;
      }
      
      // Ajouter les frais d'urgence
      if (calculateDeliveryFeeDto.isUrgentDelivery) {
        deliveryFee += urgentFee;
      }
      
      return {
        zoneName: calculateDeliveryFeeDto.zoneName,
        basePrice,
        deliveryFee,
        isUrgentDelivery: calculateDeliveryFeeDto.isUrgentDelivery || false,
        estimatedDeliveryTime: calculateDeliveryFeeDto.isUrgentDelivery ? '30-60 minutes' : '2-4 hours',
        freeShippingThreshold: 50000,
        isFreeShipping: calculateDeliveryFeeDto.orderAmount >= 50000,
      };
    } catch (error) {
      console.error('Erreur lors du calcul des frais de livraison:', error);
      throw new BadRequestException('Erreur lors du calcul des frais de livraison');
    }
  }

  async applyPromoCode(userId: string, applyPromoCodeDto: ApplyPromoCodeDto) {
    try {
      // Récupérer le panier
      const cart = await this.prisma.cart.findFirst({
        where: { userId },
      });

      if (!cart) {
        throw new NotFoundException('Panier non trouvé');
      }

      // Vérifier le code promo (simulation - dans une vraie app, vérifier en base)
      const validCodes = ['WELCOME10', 'SAVE20', 'FIRSTORDER'];
      
      if (!validCodes.includes(applyPromoCodeDto.code)) {
        throw new BadRequestException('Code promo invalide');
      }

      // Calculer la réduction
      const discountRate = applyPromoCodeDto.code === 'WELCOME10' ? 0.1 : 
                          applyPromoCodeDto.code === 'SAVE20' ? 0.2 : 0.05;
      
      const discount = Math.round(Number(cart.subtotal) * discountRate);
      const newTotal = Number(cart.subtotal) + Number(cart.shippingCost) + Number(cart.tax) - discount;

      // Mettre à jour le panier
      await this.prisma.cart.update({
        where: { id: cart.id },
        data: {
          promoCode: applyPromoCodeDto.code,
          discount,
          total: newTotal,
          updatedAt: new Date(),
        },
      });

      // Retourner le panier mis à jour
      return await this.getCart(userId);
    } catch (error) {
      console.error('Erreur lors de l\'application du code promo:', error);
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Erreur lors de l\'application du code promo');
    }
  }

  async removePromoCode(userId: string) {
    try {
      // Récupérer le panier
      const cart = await this.prisma.cart.findFirst({
        where: { userId },
      });

      if (!cart) {
        throw new NotFoundException('Panier non trouvé');
      }

      // Recalculer le total sans réduction
      const newTotal = Number(cart.subtotal) + Number(cart.shippingCost) + Number(cart.tax);

      // Mettre à jour le panier
      await this.prisma.cart.update({
        where: { id: cart.id },
        data: {
          promoCode: null,
          discount: 0,
          total: newTotal,
          updatedAt: new Date(),
        },
      });

      // Retourner le panier mis à jour
      return await this.getCart(userId);
    } catch (error) {
      console.error('Erreur lors de la suppression du code promo:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erreur lors de la suppression du code promo');
    }
  }
}

