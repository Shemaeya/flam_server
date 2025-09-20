import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
  DELIVERY = 'DELIVERY',
}

export class RegisterDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '+225123456789', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ 
    example: 'CLIENT', 
    enum: UserRole, 
    description: 'Type d\'utilisateur: CLIENT, ADMIN, ou DELIVERY',
    required: false 
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

export class LoginDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({ example: 'your-refresh-token' })
  @IsString()
  refreshToken: string;
}

export class ForgotPasswordDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: 'your-reset-token' })
  @IsString()
  token: string;

  @ApiProperty({ example: 'newpassword123', minLength: 6 })
  @IsString()
  @MinLength(6)
  newPassword: string;
}

export class VerifyEmailDto {
  @ApiProperty({ example: 'your-verification-token' })
  @IsString()
  token: string;
}

export class VerifyPhoneDto {
  @ApiProperty({ example: '123456' })
  @IsString()
  code: string;
}

// DTOs spécifiques pour chaque type d'utilisateur
export class ClientRegisterDto extends RegisterDto {
  @ApiProperty({ example: 'CLIENT', enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole = UserRole.CLIENT;
}

export class AdminRegisterDto extends RegisterDto {
  @ApiProperty({ example: 'ADMIN', enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole = UserRole.ADMIN;
}

export class DeliveryRegisterDto extends RegisterDto {
  @ApiProperty({ example: 'DELIVERY', enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole = UserRole.DELIVERY;
}
