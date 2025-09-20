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
exports.CurrencyResponseDto = exports.UpdateCurrencyDto = exports.CreateCurrencyDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateCurrencyDto {
}
exports.CreateCurrencyDto = CreateCurrencyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Code de la devise (ex: FCFA, USD, EUR)' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCurrencyDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom de la devise (ex: Franc CFA, Dollar US)' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCurrencyDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Symbole de la devise (ex: FCFA, $, €)' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCurrencyDto.prototype, "symbol", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Position du symbole (before, after)' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCurrencyDto.prototype, "symbolPosition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre de décimales à afficher' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(4),
    __metadata("design:type", Number)
], CreateCurrencyDto.prototype, "decimalPlaces", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Séparateur de milliers' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCurrencyDto.prototype, "thousandsSeparator", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Séparateur de décimales' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCurrencyDto.prototype, "decimalSeparator", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Taux de change par rapport à la devise de base' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateCurrencyDto.prototype, "exchangeRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Devise par défaut' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCurrencyDto.prototype, "isDefault", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Devise active' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCurrencyDto.prototype, "isActive", void 0);
class UpdateCurrencyDto {
}
exports.UpdateCurrencyDto = UpdateCurrencyDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Code de la devise' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCurrencyDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Nom de la devise' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCurrencyDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Symbole de la devise' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCurrencyDto.prototype, "symbol", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Position du symbole' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCurrencyDto.prototype, "symbolPosition", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Nombre de décimales' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(4),
    __metadata("design:type", Number)
], UpdateCurrencyDto.prototype, "decimalPlaces", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Séparateur de milliers' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCurrencyDto.prototype, "thousandsSeparator", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Séparateur de décimales' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCurrencyDto.prototype, "decimalSeparator", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Taux de change' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateCurrencyDto.prototype, "exchangeRate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Devise par défaut' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateCurrencyDto.prototype, "isDefault", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Devise active' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateCurrencyDto.prototype, "isActive", void 0);
class CurrencyResponseDto {
}
exports.CurrencyResponseDto = CurrencyResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CurrencyResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CurrencyResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CurrencyResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CurrencyResponseDto.prototype, "symbol", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CurrencyResponseDto.prototype, "symbolPosition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CurrencyResponseDto.prototype, "decimalPlaces", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CurrencyResponseDto.prototype, "thousandsSeparator", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CurrencyResponseDto.prototype, "decimalSeparator", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CurrencyResponseDto.prototype, "exchangeRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CurrencyResponseDto.prototype, "isDefault", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CurrencyResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CurrencyResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CurrencyResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=currency.dto.js.map