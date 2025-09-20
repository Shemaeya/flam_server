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
exports.DeliveryRegisterDto = exports.AdminRegisterDto = exports.ClientRegisterDto = exports.VerifyPhoneDto = exports.VerifyEmailDto = exports.ResetPasswordDto = exports.ForgotPasswordDto = exports.RefreshTokenDto = exports.LoginDto = exports.RegisterDto = exports.UserRole = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var UserRole;
(function (UserRole) {
    UserRole["CLIENT"] = "CLIENT";
    UserRole["ADMIN"] = "ADMIN";
    UserRole["DELIVERY"] = "DELIVERY";
})(UserRole || (exports.UserRole = UserRole = {}));
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john@example.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Doe' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123', minLength: 6 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+225123456789', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'CLIENT',
        enum: UserRole,
        description: 'Type d\'utilisateur: CLIENT, ADMIN, ou DELIVERY',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(UserRole),
    __metadata("design:type", String)
], RegisterDto.prototype, "role", void 0);
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john@example.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
class RefreshTokenDto {
}
exports.RefreshTokenDto = RefreshTokenDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'your-refresh-token' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RefreshTokenDto.prototype, "refreshToken", void 0);
class ForgotPasswordDto {
}
exports.ForgotPasswordDto = ForgotPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john@example.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ForgotPasswordDto.prototype, "email", void 0);
class ResetPasswordDto {
}
exports.ResetPasswordDto = ResetPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'your-reset-token' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'newpassword123', minLength: 6 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "newPassword", void 0);
class VerifyEmailDto {
}
exports.VerifyEmailDto = VerifyEmailDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'your-verification-token' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyEmailDto.prototype, "token", void 0);
class VerifyPhoneDto {
}
exports.VerifyPhoneDto = VerifyPhoneDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyPhoneDto.prototype, "code", void 0);
class ClientRegisterDto extends RegisterDto {
    constructor() {
        super(...arguments);
        this.role = UserRole.CLIENT;
    }
}
exports.ClientRegisterDto = ClientRegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CLIENT', enum: UserRole }),
    (0, class_validator_1.IsEnum)(UserRole),
    __metadata("design:type", String)
], ClientRegisterDto.prototype, "role", void 0);
class AdminRegisterDto extends RegisterDto {
    constructor() {
        super(...arguments);
        this.role = UserRole.ADMIN;
    }
}
exports.AdminRegisterDto = AdminRegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ADMIN', enum: UserRole }),
    (0, class_validator_1.IsEnum)(UserRole),
    __metadata("design:type", String)
], AdminRegisterDto.prototype, "role", void 0);
class DeliveryRegisterDto extends RegisterDto {
    constructor() {
        super(...arguments);
        this.role = UserRole.DELIVERY;
    }
}
exports.DeliveryRegisterDto = DeliveryRegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'DELIVERY', enum: UserRole }),
    (0, class_validator_1.IsEnum)(UserRole),
    __metadata("design:type", String)
], DeliveryRegisterDto.prototype, "role", void 0);
//# sourceMappingURL=auth.dto.js.map