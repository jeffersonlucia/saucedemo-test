import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'jao.owner@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'demo1234' })
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiProperty({ example: 'bar-do-jao', required: false })
  @IsString()
  tenantSlug?: string;
}
