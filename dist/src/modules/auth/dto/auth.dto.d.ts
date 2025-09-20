export declare enum UserRole {
    CLIENT = "CLIENT",
    ADMIN = "ADMIN",
    DELIVERY = "DELIVERY"
}
export declare class RegisterDto {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    phone?: string;
    role?: UserRole;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class RefreshTokenDto {
    refreshToken: string;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class ResetPasswordDto {
    token: string;
    newPassword: string;
}
export declare class VerifyEmailDto {
    token: string;
}
export declare class VerifyPhoneDto {
    code: string;
}
export declare class ClientRegisterDto extends RegisterDto {
    role: UserRole;
}
export declare class AdminRegisterDto extends RegisterDto {
    role: UserRole;
}
export declare class DeliveryRegisterDto extends RegisterDto {
    role: UserRole;
}
