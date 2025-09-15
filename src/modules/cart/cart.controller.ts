import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import {
  AddToCartDto,
  UpdateCartItemDto,
  ApplyPromoCodeDto,
  CalculateDeliveryFeeDto,
} from './dto/cart.dto';

@ApiTags('Cart')
@Controller('cart')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Get user cart' })
  @ApiResponse({ status: 200, description: 'Cart retrieved successfully' })
  async getCart(@Request() req) {
    return this.cartService.getCart(req.user.id);
  }

  @Post('items')
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiResponse({ status: 201, description: 'Item added to cart successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async addToCart(@Request() req, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(req.user.id, addToCartDto);
  }

  @Patch('items/:itemId')
  @ApiOperation({ summary: 'Update cart item quantity' })
  @ApiResponse({ status: 200, description: 'Cart item updated successfully' })
  async updateCartItem(
    @Request() req,
    @Param('itemId') itemId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateCartItem(req.user.id, itemId, updateCartItemDto);
  }

  @Delete('items/:itemId')
  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiResponse({ status: 200, description: 'Item removed from cart successfully' })
  async removeCartItem(@Request() req, @Param('itemId') itemId: string) {
    return this.cartService.removeCartItem(req.user.id, itemId);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear cart' })
  @ApiResponse({ status: 200, description: 'Cart cleared successfully' })
  async clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.id);
  }

  @Get('count')
  @ApiOperation({ summary: 'Get cart item count' })
  @ApiResponse({ status: 200, description: 'Cart item count retrieved successfully' })
  async getCartItemCount(@Request() req) {
    const count = await this.cartService.getCartItemCount(req.user.id);
    return { count };
  }

  @Post('delivery-fee')
  @ApiOperation({ summary: 'Calculate delivery fee' })
  @ApiResponse({ status: 200, description: 'Delivery fee calculated successfully' })
  async calculateDeliveryFee(@Body() calculateDeliveryFeeDto: CalculateDeliveryFeeDto) {
    return this.cartService.calculateDeliveryFee(calculateDeliveryFeeDto);
  }

  @Post('promo-code')
  @ApiOperation({ summary: 'Apply promo code' })
  @ApiResponse({ status: 200, description: 'Promo code applied successfully' })
  @ApiResponse({ status: 400, description: 'Invalid promo code' })
  async applyPromoCode(@Request() req, @Body() applyPromoCodeDto: ApplyPromoCodeDto) {
    return this.cartService.applyPromoCode(req.user.id, applyPromoCodeDto);
  }

  @Delete('promo-code')
  @ApiOperation({ summary: 'Remove promo code' })
  @ApiResponse({ status: 200, description: 'Promo code removed successfully' })
  async removePromoCode(@Request() req) {
    return this.cartService.removePromoCode(req.user.id);
  }
}

