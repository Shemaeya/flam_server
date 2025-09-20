import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private prisma;
    constructor(configService: ConfigService, prisma: PrismaService);
    validate(payload: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string;
        email: string;
        firstName: string;
        lastName: string;
        profileImage: string;
        role: import(".prisma/client").$Enums.UserRole;
        isEmailVerified: boolean;
        isPhoneVerified: boolean;
    }>;
}
export {};
