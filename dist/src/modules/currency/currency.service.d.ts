import { PrismaService } from '../../prisma/prisma.service';
import { CreateCurrencyDto, UpdateCurrencyDto, CurrencyResponseDto } from './dto/currency.dto';
export declare class CurrencyService {
    private prisma;
    constructor(prismaService: PrismaService);
    create(createCurrencyDto: CreateCurrencyDto): Promise<CurrencyResponseDto>;
    findAll(): Promise<CurrencyResponseDto[]>;
    findOne(id: string): Promise<CurrencyResponseDto>;
    findByCode(code: string): Promise<CurrencyResponseDto>;
    getDefault(): Promise<CurrencyResponseDto>;
    update(id: string, updateCurrencyDto: UpdateCurrencyDto): Promise<CurrencyResponseDto>;
    remove(id: string): Promise<void>;
    setDefault(id: string): Promise<CurrencyResponseDto>;
    formatPrice(amount: number, currencyCode?: string): Promise<string>;
    private formatNumber;
    private mapToResponseDto;
}
