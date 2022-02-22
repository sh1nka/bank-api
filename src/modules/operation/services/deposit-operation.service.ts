import { ACCOUNT_NOT_FOUND, VALUE_MAX_DEPOSIT_LIMIT } from '@common/messages';
import { Account } from '@modules/account/account.entity';
import { AccountRepository } from '@modules/account/repositories/account.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DepositDto } from '../dto/deposit.dto';

@Injectable()
export class OperationDepositService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async deposit(account: Account, body: DepositDto): Promise<any> {
    try {
      const accountFound = await this.accountRepository.findAccountCpf(
        account.cpf,
      );
      if (!accountFound) {
        throw new NotFoundException(ACCOUNT_NOT_FOUND);
      }
      const { value } = body;
      const limitValue = value > 2000 ? true : false;
      if (limitValue) {
        throw new Error(VALUE_MAX_DEPOSIT_LIMIT);
      }
      const balanceUpdate = {
        id: account.id,
        balance: account.balance + value,
      };
      await this.accountRepository.updateBalance(balanceUpdate);
      return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
