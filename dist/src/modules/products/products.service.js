"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createBrand(createBrandDto) {
        const existingBrand = await this.prisma.brand.findUnique({
            where: { name: createBrandDto.name },
        });
        if (existingBrand) {
            throw new common_1.ConflictException('Brand with this name already exists');
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
    async findBrandById(id) {
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
            throw new common_1.NotFoundException('Brand not found');
        }
        return brand;
    }
    async updateBrand(id, updateBrandDto) {
        const brand = await this.prisma.brand.findUnique({
            where: { id },
        });
        if (!brand) {
            throw new common_1.NotFoundException('Brand not found');
        }
        if (updateBrandDto.name && updateBrandDto.name !== brand.name) {
            const existingBrand = await this.prisma.brand.findUnique({
                where: { name: updateBrandDto.name },
            });
            if (existingBrand) {
                throw new common_1.ConflictException('Brand with this name already exists');
            }
        }
        return this.prisma.brand.update({
            where: { id },
            data: updateBrandDto,
        });
    }
    async deleteBrand(id) {
        const brand = await this.prisma.brand.findUnique({
            where: { id },
        });
        if (!brand) {
            throw new common_1.NotFoundException('Brand not found');
        }
        await this.prisma.brand.delete({
            where: { id },
        });
        return { message: 'Brand deleted successfully' };
    }
    async createCategory(createCategoryDto) {
        const existingCategory = await this.prisma.category.findUnique({
            where: { name: createCategoryDto.name },
        });
        if (existingCategory) {
            throw new common_1.ConflictException('Category with this name already exists');
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
    async findCategoryById(id) {
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
            throw new common_1.NotFoundException('Category not found');
        }
        return category;
    }
    async updateCategory(id, updateCategoryDto) {
        const category = await this.prisma.category.findUnique({
            where: { id },
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        if (updateCategoryDto.name && updateCategoryDto.name !== category.name) {
            const existingCategory = await this.prisma.category.findUnique({
                where: { name: updateCategoryDto.name },
            });
            if (existingCategory) {
                throw new common_1.ConflictException('Category with this name already exists');
            }
        }
        return this.prisma.category.update({
            where: { id },
            data: updateCategoryDto,
        });
    }
    async deleteCategory(id) {
        const category = await this.prisma.category.findUnique({
            where: { id },
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        await this.prisma.category.delete({
            where: { id },
        });
        return { message: 'Category deleted successfully' };
    }
    async createType(createTypeDto) {
        const existingType = await this.prisma.type.findUnique({
            where: { name: createTypeDto.name },
        });
        if (existingType) {
            throw new common_1.ConflictException('Type with this name already exists');
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
    async findTypeById(id) {
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
            throw new common_1.NotFoundException('Type not found');
        }
        return type;
    }
    async updateType(id, updateTypeDto) {
        const type = await this.prisma.type.findUnique({
            where: { id },
        });
        if (!type) {
            throw new common_1.NotFoundException('Type not found');
        }
        if (updateTypeDto.name && updateTypeDto.name !== type.name) {
            const existingType = await this.prisma.type.findUnique({
                where: { name: updateTypeDto.name },
            });
            if (existingType) {
                throw new common_1.ConflictException('Type with this name already exists');
            }
        }
        return this.prisma.type.update({
            where: { id },
            data: updateTypeDto,
        });
    }
    async deleteType(id) {
        const type = await this.prisma.type.findUnique({
            where: { id },
        });
        if (!type) {
            throw new common_1.NotFoundException('Type not found');
        }
        await this.prisma.type.delete({
            where: { id },
        });
        return { message: 'Type deleted successfully' };
    }
    async createProduct(createProductDto) {
        const [brand, category, type] = await Promise.all([
            this.prisma.brand.findUnique({ where: { id: createProductDto.brandId } }),
            this.prisma.category.findUnique({ where: { id: createProductDto.categoryId } }),
            this.prisma.type.findUnique({ where: { id: createProductDto.typeId } }),
        ]);
        if (!brand) {
            throw new common_1.NotFoundException('Brand not found');
        }
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        if (!type) {
            throw new common_1.NotFoundException('Type not found');
        }
        const existingProduct = await this.prisma.product.findFirst({
            where: {
                brandId: createProductDto.brandId,
                categoryId: createProductDto.categoryId,
                typeId: createProductDto.typeId,
            },
        });
        if (existingProduct) {
            throw new common_1.ConflictException('Product with this combination already exists');
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
    async findAllProducts(query) {
        const { brandId, categoryId, typeId, search, page = 1, limit = 10, } = query;
        const skip = (page - 1) * limit;
        const where = {
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
        const productsWithRating = products.map(product => ({
            ...product,
            averageRating: product.reviews.length > 0
                ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
                : 0,
            reviewsCount: product.reviews.length,
        }));
        return {
            products: productsWithRating,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async findProductById(id) {
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
            throw new common_1.NotFoundException('Product not found');
        }
        const averageRating = product.reviews.length > 0
            ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
            : 0;
        return {
            ...product,
            averageRating,
            reviewsCount: product.reviews.length,
        };
    }
    async updateProduct(id, updateProductDto) {
        const product = await this.prisma.product.findUnique({
            where: { id },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        if (updateProductDto.brandId) {
            const brand = await this.prisma.brand.findUnique({
                where: { id: updateProductDto.brandId },
            });
            if (!brand) {
                throw new common_1.NotFoundException('Brand not found');
            }
        }
        if (updateProductDto.categoryId) {
            const category = await this.prisma.category.findUnique({
                where: { id: updateProductDto.categoryId },
            });
            if (!category) {
                throw new common_1.NotFoundException('Category not found');
            }
        }
        if (updateProductDto.typeId) {
            const type = await this.prisma.type.findUnique({
                where: { id: updateProductDto.typeId },
            });
            if (!type) {
                throw new common_1.NotFoundException('Type not found');
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
    async deleteProduct(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        await this.prisma.product.delete({
            where: { id },
        });
        return { message: 'Product deleted successfully' };
    }
    async searchProducts(searchTerm) {
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
            },
            take: 20,
        });
        return products;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map