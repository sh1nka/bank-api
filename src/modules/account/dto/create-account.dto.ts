import { CPF_LENGTH } from '@common/messages';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(11, 11, { message: CPF_LENGTH })
  cpf: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 24)
  password: string;

  @IsOptional()
  @IsNumberString()
  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
