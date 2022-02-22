import {
  ACCOUNT_NOT_FOUND,
  INSUFFICIENT_BALANCE,
  VALUE_MAX_TRANSFER_LIMIT,
} from '@common/messages';
import { Account } from '@modules/account/account.entity';
import { AccountRepository } from '@modules/account/repositories/account.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TransferDto } from '../dto/transfer.dto';

@Injectable()
export class OperationTransferService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async transfer(
    account: Account,
    receiverAccountCpf: string,
    body: TransferDto,
  ): Promise<any> {
    try {
      const receiverAccount = await this.accountRepository.findAccountByCpf(
        receiverAccountCpf,
      );
      if (!receiverAccount) {
        throw new NotFoundException(ACCOUNT_NOT_FOUND);
      }

      const { value } = body;

      const limitValue = value > 2000 ? true : false;

      if (limitValue) {
        throw new Error(VALUE_MAX_TRANSFER_LIMIT);
      }

      const newAccountBalance = account.balance - value;
      const isAccountBalanceNegative = newAccountBalance < 0 ? true : false;
      if (isAccountBalanceNegative) {
        throw new Error(INSUFFICIENT_BALANCE);
      }

      const updatedAccount = {
        id: account.id,
        balance: newAccountBalance,
      };

      await this.accountRepository.updateBalance(updatedAccount);

      const receiverNewAccountBalance = receiverAccount.balance + value;

      const updatedReceiverAccount = {
        id: receiverAccount.id,
        balance: receiverNewAccountBalance,
      };
      await this.accountRepository.updateBalance(updatedReceiverAccount);
      return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
