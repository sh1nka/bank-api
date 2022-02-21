import { CPF_ACCOUNT_ALREADY_CREATED } from '@common/messages';
import { AuthSignUpService } from '@modules/auth/services/sign-up-auth.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { instanceToInstance } from 'class-transformer';
import { Account } from '../account.entity';
import { CreateAccountDto } from '../dto/create-account.dto';
import { AccountRepository } from '../repositories/account.repository';

@Injectable()
export class CreateAccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly authSignUpService: AuthSignUpService,
  ) {}

  async createAccount(body: CreateAccountDto): Promise<Account> {
    try {
      const accountCpf = await this.accountRepository.findAccountCpf(body.cpf);
      if (accountCpf) {
        throw new Error(CPF_ACCOUNT_ALREADY_CREATED);
      }

      await this.accountRepository.saveAccount(body);
      await this.authSignUpService.signUp(body);
      const foundAccount = await this.accountRepository.findAccountByCpf(
        body.cpf,
      );
      const plainedAccount = instanceToInstance(foundAccount);
      return plainedAccount;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
