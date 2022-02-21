import { AccountRepository } from '@modules/account/repositories/account.repository';
import { Injectable } from '@nestjs/common';
import { DepositOperationDto } from '../dto/deposit-operation.dto';

@Injectable()
export class OperationDepositService {
  constructor(private readonly accountReposiroty: AccountRepository) {}

  async deposit(body: DepositOperationDto): Promise<any> {
    return;
  }
}
