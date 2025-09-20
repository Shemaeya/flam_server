import { CurrencyService } from './currency.service';
import { CreateCurrencyDto, UpdateCurrencyDto, CurrencyResponseDto } from './dto/currency.dto';
export declare class CurrencyController {
    private readonly currencyService;
    constructor(currencyService: CurrencyService);
    create(createCurrencyDto: CreateCurrencyDto): Promise<CurrencyResponseDto>;
    findAll(): Promise<CurrencyResponseDto[]>;
    getDefault(): Promise<CurrencyResponseDto>;
    formatPrice(amount: number, code?: string): Promise<{
        formatted: string;
    }>;
    findOne(id: string): Promise<CurrencyResponseDto>;
    findByCode(code: string): Promise<CurrencyResponseDto>;
    update(id: string, updateCurrencyDto: UpdateCurrencyDto): Promise<CurrencyResponseDto>;
    setDefault(id: string): Promise<CurrencyResponseDto>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
