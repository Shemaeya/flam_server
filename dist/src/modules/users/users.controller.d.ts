import { UsersService } from './users.service';
import { UpdateUserDto, UpdateEmailDto, UpdatePasswordDto, UpdateFcmTokenDto } from './dto/user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(user: any): Promise<{
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
    updateProfile(user: any, updateUserDto: UpdateUserDto): Promise<{
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
    updateEmail(user: any, updateEmailDto: UpdateEmailDto): Promise<{
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
    updatePassword(user: any, updatePasswordDto: UpdatePasswordDto): Promise<{
        message: string;
    }>;
    updateFcmToken(user: any, updateFcmTokenDto: UpdateFcmTokenDto): Promise<{
        message: string;
    }>;
    getUserStats(user: any): Promise<{
        ordersCount: number;
        addressesCount: number;
        reviewsCount: number;
    }>;
    deleteAccount(user: any): Promise<{
        message: string;
    }>;
}
