import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto, ForgotPasswordDto, ResetPasswordDto, VerifyEmailDto, VerifyPhoneDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            createdAt: Date;
            phone: string;
            email: string;
            firstName: string;
            lastName: string;
            isEmailVerified: boolean;
            isPhoneVerified: boolean;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            phone: any;
            profileImage: any;
            isEmailVerified: any;
            isPhoneVerified: any;
            createdAt: any;
        };
    }>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void>;
    verifyEmail(verifyEmailDto: VerifyEmailDto): Promise<void>;
    verifyPhone(verifyPhoneDto: VerifyPhoneDto): Promise<void>;
    logout(): Promise<{
        message: string;
    }>;
}
