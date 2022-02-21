import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsNumberString()
  cpf: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
