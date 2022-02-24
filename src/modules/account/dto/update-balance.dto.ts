import { IsNotEmpty } from 'class-validator';

export class UpdateBalanceDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  balance: number;
}
