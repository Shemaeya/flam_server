import { PrismaService } from './prisma/prisma.service';
export declare class HealthController {
    private prisma;
    constructor(prisma: PrismaService);
    check(): Promise<{
        status: string;
        timestamp: string;
        uptime: number;
        database: string;
        version: string;
        error?: undefined;
    } | {
        status: string;
        timestamp: string;
        uptime: number;
        database: string;
        error: any;
        version: string;
    }>;
}
