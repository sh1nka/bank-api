import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AccountRepository } from '@modules/account/repositories/account.repository';
import { CreateAccountDto } from '@modules/account/dto/create-account.dto';

@Injectable()
export class AuthSignUpService {
  constructor(private accountRepository: AccountRepository) {}

  async signUp(body: CreateAccountDto): Promise<void> {
    try {
      const { password } = body;

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      await this.accountRepository.saveAccount({
        ...body,
        password: hashedPassword,
      });
      return;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
