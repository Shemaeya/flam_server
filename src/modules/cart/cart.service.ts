import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AddToCartDto, UpdateCartItemDto, ApplyPromoCodeDto, CalculateDeliveryFeeDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: string) {
    // Pour l'instant, retourner un panier vide
    // Dans une vraie implémentation, on récupérerait le panier depuis la base de données
    return {
      id: 'temp-cart-id',
      userId,
      items: [],
      subtotal: 0,
      shippingCost: 0,
      tax: 0,
      total: 0,
      promoCode: null,
      discount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async addToCart(userId: string, addToCartDto: AddToCartDto) {
    // Vérifier que le produit existe
    const product = await this.prisma.product.findUnique({
      where: { id: addToCartDto.productId },
      include: { brand: true, category: true, type: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Pour l'instant, retourner le panier avec l'article ajouté
    // Dans une vraie implémentation, on sauvegarderait en base
    return {
      id: 'temp-cart-id',
      userId,
      items: [
        {
          id: 'temp-item-id',
          productId: addToCartDto.productId,
          quantity: addToCartDto.quantity,
          itemType: addToCartDto.itemType,
          selectedSize: addToCartDto.selectedSize,
          selectedColor: addToCartDto.selectedColor,
          unitPrice: addToCartDto.itemType === 'PURCHASE' 
            ? Number(product.category.pricePurchase) 
            : Number(product.category.priceRefill),
          totalPrice: addToCartDto.itemType === 'PURCHASE' 
            ? Number(product.category.pricePurchase) * addToCartDto.quantity
            : Number(product.category.priceRefill) * addToCartDto.quantity,
          product: product,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      subtotal: addToCartDto.itemType === 'PURCHASE' 
        ? Number(product.category.pricePurchase) * addToCartDto.quantity
        : Number(product.category.priceRefill) * addToCartDto.quantity,
      shippingCost: 0,
      tax: 0,
      total: addToCartDto.itemType === 'PURCHASE' 
        ? Number(product.category.pricePurchase) * addToCartDto.quantity
        : Number(product.category.priceRefill) * addToCartDto.quantity,
      promoCode: null,
      discount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async updateCartItem(userId: string, itemId: string, updateCartItemDto: UpdateCartItemDto) {
    // Pour l'instant, retourner le panier mis à jour
    return this.getCart(userId);
  }

  async removeCartItem(userId: string, itemId: string) {
    // Pour l'instant, retourner le panier vide
    return this.getCart(userId);
  }

  async clearCart(userId: string) {
    // Pour l'instant, retourner le panier vide
    return this.getCart(userId);
  }

  async getCartItemCount(userId: string) {
    const cart = await this.getCart(userId);
    return cart.items.length;
  }

  async calculateDeliveryFee(calculateDeliveryFeeDto: CalculateDeliveryFeeDto) {
    // Logique de calcul des frais de livraison
    const basePrice = 2000; // Prix de base en FCFA
    const pricePerKm = 500; // Prix par km en FCFA
    
    // Simulation simple
    const deliveryFee = basePrice + (calculateDeliveryFeeDto.isUrgentDelivery ? 1000 : 0);
    
    return {
      zoneName: calculateDeliveryFeeDto.zoneName,
      basePrice,
      deliveryFee,
      isUrgentDelivery: calculateDeliveryFeeDto.isUrgentDelivery || false,
      estimatedDeliveryTime: calculateDeliveryFeeDto.isUrgentDelivery ? '30-60 minutes' : '2-4 hours',
    };
  }

  async applyPromoCode(userId: string, applyPromoCodeDto: ApplyPromoCodeDto) {
    // Vérifier le code promo (simulation)
    const validCodes = ['WELCOME10', 'SAVE20', 'FIRSTORDER'];
    
    if (!validCodes.includes(applyPromoCodeDto.code)) {
      throw new BadRequestException('Invalid promo code');
    }

    const cart = await this.getCart(userId);
    const discount = applyPromoCodeDto.code === 'WELCOME10' ? 0.1 : 
                    applyPromoCodeDto.code === 'SAVE20' ? 0.2 : 0.05;

    return {
      ...cart,
      promoCode: applyPromoCodeDto.code,
      discount: cart.subtotal * discount,
      total: cart.subtotal - (cart.subtotal * discount),
    };
  }

  async removePromoCode(userId: string) {
    const cart = await this.getCart(userId);
    return {
      ...cart,
      promoCode: null,
      discount: 0,
      total: cart.subtotal,
    };
  }
}

