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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const products_service_1 = require("./products.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const product_dto_1 = require("./dto/product.dto");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async createBrand(createBrandDto) {
        return this.productsService.createBrand(createBrandDto);
    }
    async findAllBrands() {
        return this.productsService.findAllBrands();
    }
    async findBrandById(id) {
        return this.productsService.findBrandById(id);
    }
    async updateBrand(id, updateBrandDto) {
        return this.productsService.updateBrand(id, updateBrandDto);
    }
    async deleteBrand(id) {
        return this.productsService.deleteBrand(id);
    }
    async createCategory(createCategoryDto) {
        return this.productsService.createCategory(createCategoryDto);
    }
    async findAllCategories() {
        return this.productsService.findAllCategories();
    }
    async findCategoryById(id) {
        return this.productsService.findCategoryById(id);
    }
    async updateCategory(id, updateCategoryDto) {
        return this.productsService.updateCategory(id, updateCategoryDto);
    }
    async deleteCategory(id) {
        return this.productsService.deleteCategory(id);
    }
    async createType(createTypeDto) {
        return this.productsService.createType(createTypeDto);
    }
    async findAllTypes() {
        return this.productsService.findAllTypes();
    }
    async findTypeById(id) {
        return this.productsService.findTypeById(id);
    }
    async updateType(id, updateTypeDto) {
        return this.productsService.updateType(id, updateTypeDto);
    }
    async deleteType(id) {
        return this.productsService.deleteType(id);
    }
    async createProduct(createProductDto) {
        return this.productsService.createProduct(createProductDto);
    }
    async findAllProducts(query) {
        return this.productsService.findAllProducts(query);
    }
    async getProductsForMobile(query) {
        return this.productsService.getProductsForMobile(query);
    }
    async searchProducts(searchTerm) {
        return this.productsService.searchProducts(searchTerm);
    }
    async findProductById(id) {
        return this.productsService.findProductById(id);
    }
    async updateProduct(id, updateProductDto) {
        return this.productsService.updateProduct(id, updateProductDto);
    }
    async deleteProduct(id) {
        return this.productsService.deleteProduct(id);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Post)('brands'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new brand' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Brand created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Brand already exists' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.CreateBrandDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createBrand", null);
__decorate([
    (0, common_1.Get)('brands'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active brands' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Brands retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAllBrands", null);
__decorate([
    (0, common_1.Get)('brands/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get brand by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Brand ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Brand retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Brand not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findBrandById", null);
__decorate([
    (0, common_1.Patch)('brands/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update brand' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Brand ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Brand updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Brand not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_dto_1.UpdateBrandDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateBrand", null);
__decorate([
    (0, common_1.Delete)('brands/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete brand' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Brand ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Brand deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Brand not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteBrand", null);
__decorate([
    (0, common_1.Post)('categories'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new category' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Category created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Category already exists' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Get)('categories'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active categories' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Categories retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAllCategories", null);
__decorate([
    (0, common_1.Get)('categories/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get category by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Category ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Category retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Category not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findCategoryById", null);
__decorate([
    (0, common_1.Patch)('categories/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update category' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Category ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Category updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Category not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)('categories/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete category' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Category ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Category deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Category not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteCategory", null);
__decorate([
    (0, common_1.Post)('types'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new type' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Type created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Type already exists' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.CreateTypeDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createType", null);
__decorate([
    (0, common_1.Get)('types'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active types' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Types retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAllTypes", null);
__decorate([
    (0, common_1.Get)('types/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get type by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Type ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Type retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Type not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findTypeById", null);
__decorate([
    (0, common_1.Patch)('types/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update type' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Type ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Type updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Type not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_dto_1.UpdateTypeDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateType", null);
__decorate([
    (0, common_1.Delete)('types/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete type' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Type ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Type deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Type not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteType", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new product' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Product created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Brand, category, or type not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Product already exists' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all products with filters' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Products retrieved successfully' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProductQueryDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAllProducts", null);
__decorate([
    (0, common_1.Get)('mobile'),
    (0, swagger_1.ApiOperation)({ summary: 'Get products optimized for mobile app with all relations' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Products with relations retrieved successfully' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProductQueryDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProductsForMobile", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search products' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Search results retrieved successfully' }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "searchProducts", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get product by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Product ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findProductById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update product' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Product ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete product' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Product ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteProduct", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('Products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map