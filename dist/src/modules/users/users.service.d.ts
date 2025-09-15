import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto, UpdateEmailDto, UpdatePasswordDto, UpdateFcmTokenDto } from './dto/user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string;
        email: string;
        firstName: string;
        lastName: string;
        profileImage: string;
        isEmailVerified: boolean;
        isPhoneVerified: boolean;
        fcmToken: string;
    }>;
    updateProfile(userId: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string;
        email: string;
        firstName: string;
        lastName: string;
        profileImage: string;
        isEmailVerified: boolean;
        isPhoneVerified: boolean;
        fcmToken: string;
    }>;
    updateEmail(userId: string, updateEmailDto: UpdateEmailDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string;
        email: string;
        firstName: string;
        lastName: string;
        profileImage: string;
        isEmailVerified: boolean;
        isPhoneVerified: boolean;
        fcmToken: string;
    }>;
    updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto): Promise<{
        message: string;
    }>;
    updateFcmToken(userId: string, updateFcmTokenDto: UpdateFcmTokenDto): Promise<{
        message: string;
    }>;
    deleteAccount(userId: string): Promise<{
        message: string;
    }>;
    getUserStats(userId: string): Promise<{
        ordersCount: number;
        addressesCount: number;
        reviewsCount: number;
    }>;
}
