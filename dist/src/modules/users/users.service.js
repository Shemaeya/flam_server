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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phone: true,
                profileImage: true,
                isEmailVerified: true,
                isPhoneVerified: true,
                fcmToken: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async updateProfile(userId, updateUserDto) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: updateUserDto,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phone: true,
                profileImage: true,
                isEmailVerified: true,
                isPhoneVerified: true,
                fcmToken: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return updatedUser;
    }
    async updateEmail(userId, updateEmailDto) {
        const { email } = updateEmailDto;
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser && existingUser.id !== userId) {
            throw new common_1.ConflictException('Email already in use');
        }
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: {
                email,
                isEmailVerified: false,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phone: true,
                profileImage: true,
                isEmailVerified: true,
                isPhoneVerified: true,
                fcmToken: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return user;
    }
    async updatePassword(userId, updatePasswordDto) {
        const { currentPassword, newPassword } = updatePasswordDto;
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isCurrentPasswordValid) {
            throw new common_1.UnauthorizedException('Current password is incorrect');
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                passwordHash: hashedNewPassword,
            },
        });
        return { message: 'Password updated successfully' };
    }
    async updateFcmToken(userId, updateFcmTokenDto) {
        const { fcmToken } = updateFcmTokenDto;
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.prisma.user.update({
            where: { id: userId },
            data: { fcmToken },
        });
        return { message: 'FCM token updated successfully' };
    }
    async deleteAccount(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.prisma.user.delete({
            where: { id: userId },
        });
        return { message: 'Account deleted successfully' };
    }
    async getUserStats(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const [ordersCount, addressesCount, reviewsCount] = await Promise.all([
            this.prisma.order.count({
                where: { userId },
            }),
            this.prisma.address.count({
                where: { userId },
            }),
            this.prisma.review.count({
                where: { userId },
            }),
        ]);
        return {
            ordersCount,
            addressesCount,
            reviewsCount,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map