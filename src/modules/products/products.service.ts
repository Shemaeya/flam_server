import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateBrandDto,
  UpdateBrandDto,
  CreateCategoryDto,
  UpdateCategoryDto,
  CreateTypeDto,
  UpdateTypeDto,
  CreateProductDto,
  UpdateProductDto,
  ProductQueryDto,
} from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // Brands
  async createBrand(createBrandDto: CreateBrandDto) {
    const existingBrand = await this.prisma.brand.findUnique({
      where: { name: createBrandDto.name },
    });

    if (existingBrand) {
      throw new ConflictException('Brand with this name already exists');
    }

    return this.prisma.brand.create({
      data: createBrandDto,
    });
  }

  async findAllBrands() {
    return this.prisma.brand.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async findBrandById(id: string) {
    const brand = await this.prisma.brand.findUnique({
      where: { id },
      include: {
        products: {
          where: { isActive: true },
          include: {
            category: true,
            type: true,
          },
        },
      },
    });

    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    return brand;
  }

  async updateBrand(id: string, updateBrandDto: UpdateBrandDto) {
    const brand = await this.prisma.brand.findUnique({
      where: { id },
    });

    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    if (updateBrandDto.name && updateBrandDto.name !== brand.name) {
      const existingBrand = await this.prisma.brand.findUnique({
        where: { name: updateBrandDto.name },
      });

      if (existingBrand) {
        throw new ConflictException('Brand with this name already exists');
      }
    }

    return this.prisma.brand.update({
      where: { id },
      data: updateBrandDto,
    });
  }

  async deleteBrand(id: string) {
    const brand = await this.prisma.brand.findUnique({
      where: { id },
    });

    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    await this.prisma.brand.delete({
      where: { id },
    });

    return { message: 'Brand deleted successfully' };
  }

  // Categories
  async createCategory(createCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.prisma.category.findUnique({
      where: { name: createCategoryDto.name },
    });

    if (existingCategory) {
      throw new ConflictException('Category with this name already exists');
    }

    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async findAllCategories() {
    return this.prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async findCategoryById(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        products: {
          where: { isActive: true },
          include: {
            brand: true,
            type: true,
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (updateCategoryDto.name && updateCategoryDto.name !== category.name) {
      const existingCategory = await this.prisma.category.findUnique({
        where: { name: updateCategoryDto.name },
      });

      if (existingCategory) {
        throw new ConflictException('Category with this name already exists');
      }
    }

    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async deleteCategory(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.prisma.category.delete({
      where: { id },
    });

    return { message: 'Category deleted successfully' };
  }

  // Types
  async createType(createTypeDto: CreateTypeDto) {
    const existingType = await this.prisma.type.findUnique({
      where: { name: createTypeDto.name },
    });

    if (existingType) {
      throw new ConflictException('Type with this name already exists');
    }

    return this.prisma.type.create({
      data: createTypeDto,
    });
  }

  async findAllTypes() {
    return this.prisma.type.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async findTypeById(id: string) {
    const type = await this.prisma.type.findUnique({
      where: { id },
      include: {
        products: {
          where: { isActive: true },
          include: {
            brand: true,
            category: true,
          },
        },
      },
    });

    if (!type) {
      throw new NotFoundException('Type not found');
    }

    return type;
  }

  async updateType(id: string, updateTypeDto: UpdateTypeDto) {
    const type = await this.prisma.type.findUnique({
      where: { id },
    });

    if (!type) {
      throw new NotFoundException('Type not found');
    }

    if (updateTypeDto.name && updateTypeDto.name !== type.name) {
      const existingType = await this.prisma.type.findUnique({
        where: { name: updateTypeDto.name },
      });

      if (existingType) {
        throw new ConflictException('Type with this name already exists');
      }
    }

    return this.prisma.type.update({
      where: { id },
      data: updateTypeDto,
    });
  }

  async deleteType(id: string) {
    const type = await this.prisma.type.findUnique({
      where: { id },
    });

    if (!type) {
      throw new NotFoundException('Type not found');
    }

    await this.prisma.type.delete({
      where: { id },
    });

    return { message: 'Type deleted successfully' };
  }

  // Products
  async createProduct(createProductDto: CreateProductDto) {
    // Verify that brand, category, and type exist
    const [brand, category, type] = await Promise.all([
      this.prisma.brand.findUnique({ where: { id: createProductDto.brandId } }),
      this.prisma.category.findUnique({ where: { id: createProductDto.categoryId } }),
      this.prisma.type.findUnique({ where: { id: createProductDto.typeId } }),
    ]);

    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    if (!type) {
      throw new NotFoundException('Type not found');
    }

    // Check if product already exists
    const existingProduct = await this.prisma.product.findFirst({
      where: {
        brandId: createProductDto.brandId,
        categoryId: createProductDto.categoryId,
        typeId: createProductDto.typeId,
      },
    });

    if (existingProduct) {
      throw new ConflictException('Product with this combination already exists');
    }

    return this.prisma.product.create({
      data: createProductDto,
      include: {
        brand: true,
        category: true,
        type: true,
      },
    });
  }

  async findAllProducts(query: ProductQueryDto) {
    const {
      brandId,
      categoryId,
      typeId,
      search,
      page = 1,
      limit = 10,
    } = query;

    const skip = (page - 1) * limit;

    const where: any = {
      isActive: true,
    };

    if (brandId) {
      where.brandId = brandId;
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (typeId) {
      where.typeId = typeId;
    }

    if (search) {
      where.OR = [
        {
          brand: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
        {
          category: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
        {
          type: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
      ];
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: {
          brand: true,
          category: true,
          type: true,
          shopStocks: {
            include: {
              shop: true,
            },
          },
          reviews: {
            select: {
              rating: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({ where }),
    ]);

    // Calculate statistics for each product
    const productsWithStats = products.map(product => {
      const averageRating = product.reviews.length > 0
        ? Number((product.reviews.reduce((sum, review) => sum + Number(review.rating), 0) / product.reviews.length).toFixed(2))
        : 0;

      const totalStock = product.shopStocks.reduce((sum, stock) => sum + stock.quantity, 0);

      return {
        ...product,
        averageRating,
        reviewCount: product.reviews.length,
        totalStock,
        isInStock: totalStock > 0,
      };
    });

    return {
      products: productsWithStats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findProductById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        brand: true,
        category: true,
        type: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        shopStocks: {
          include: {
            shop: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Calculate average rating
    const averageRating = product.reviews.length > 0
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
      : 0;

    return {
      ...product,
      averageRating,
      reviewsCount: product.reviews.length,
    };
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Verify that brand, category, and type exist if they're being updated
    if (updateProductDto.brandId) {
      const brand = await this.prisma.brand.findUnique({
        where: { id: updateProductDto.brandId },
      });
      if (!brand) {
        throw new NotFoundException('Brand not found');
      }
    }

    if (updateProductDto.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: updateProductDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
    }

    if (updateProductDto.typeId) {
      const type = await this.prisma.type.findUnique({
        where: { id: updateProductDto.typeId },
      });
      if (!type) {
        throw new NotFoundException('Type not found');
      }
    }

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
      include: {
        brand: true,
        category: true,
        type: true,
      },
    });
  }

  async deleteProduct(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.prisma.product.delete({
      where: { id },
    });

    return { message: 'Product deleted successfully' };
  }

  // Search products
  async searchProducts(searchTerm: string) {
    const products = await this.prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
        {
          brand: {
            name: {
              contains: searchTerm,
            },
          },
        },
        {
          category: {
            name: {
              contains: searchTerm,
            },
          },
        },
        {
          type: {
            name: {
              contains: searchTerm,
            },
          },
        },
        ],
      },
      include: {
        brand: true,
        category: true,
        type: true,
        shopStocks: {
          include: {
            shop: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
      },
      take: 20,
      orderBy: { createdAt: 'desc' },
    });

    // Calculate statistics for each product
    const productsWithStats = products.map(product => {
      const reviews = (product as any).reviews || [];
      const shopStocks = (product as any).shopStocks || [];
      
      const averageRating = reviews.length > 0
        ? Number((reviews.reduce((sum: number, review: any) => sum + Number(review.rating), 0) / reviews.length).toFixed(2))
        : 0;

      const totalStock = shopStocks.reduce((sum: number, stock: any) => sum + stock.quantity, 0);

      return {
        ...product,
        averageRating,
        reviewCount: reviews.length,
        totalStock,
        isInStock: totalStock > 0,
      };
    });

    return productsWithStats;
  }

  // Optimized method to get products with all relations for mobile app
  async getProductsForMobile(query: ProductQueryDto) {
    const {
      brandId,
      categoryId,
      typeId,
      search,
      page = 1,
      limit = 20,
    } = query;

    const skip = (page - 1) * limit;

    const where: any = {
      isActive: true,
    };

    if (brandId) {
      where.brandId = brandId;
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (typeId) {
      where.typeId = typeId;
    }

    if (search) {
      where.OR = [
        {
          brand: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
        {
          category: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
        {
          type: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
      ];
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: {
          brand: {
            select: {
              id: true,
              name: true,
              logo: true,
              colors: true,
              gasColor: true,
              description: true,
              hotline: true,
              website: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
              pricePurchase: true,
              priceRefill: true,
              currentName: true,
              usage: true,
              size: true,
              weight: true,
              unit: true,
            },
          },
          type: {
            select: {
              id: true,
              name: true,
            },
          },
          shopStocks: {
            include: {
              shop: {
                select: {
                  id: true,
                  name: true,
                  address: true,
                  city: true,
                  state: true,
                  latitude: true,
                  longitude: true,
                  phone: true,
                  email: true,
                },
              },
            },
          },
          reviews: {
            select: {
              rating: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({ where }),
    ]);

    // Calculate comprehensive statistics for each product
    const productsWithStats = products.map(product => {
      const averageRating = product.reviews.length > 0
        ? Number((product.reviews.reduce((sum, review) => sum + Number(review.rating), 0) / product.reviews.length).toFixed(2))
        : 0;

      const totalStock = product.shopStocks.reduce((sum, stock) => sum + stock.quantity, 0);

      // Calculate stock by shop for detailed inventory
      const stockByShop = product.shopStocks.map(stock => ({
        shopId: stock.shopId,
        shopName: stock.shop.name,
        quantity: stock.quantity,
        shop: stock.shop,
      }));

      return {
        ...product,
        averageRating,
        reviewCount: product.reviews.length,
        totalStock,
        isInStock: totalStock > 0,
        stockByShop,
      };
    });

    return {
      success: true,
      data: {
        products: productsWithStats,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    };
  }
}
