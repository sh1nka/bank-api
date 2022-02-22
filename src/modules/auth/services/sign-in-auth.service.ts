import { INCORRECT_CREDENTIALS } from '@common/messages';
import { AccountRepository } from '@modules/account/repositories/account.repository';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { JwtPayload } from '../dto/jwt-payload.interface';

@Injectable()
export class AuthSignInService {
  constructor(
    private accountRepository: AccountRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(authDto: AuthCredentialsDto): Promise<{ token: string }> {
    try {
      const { cpf, password } = authDto;
      console.log(authDto);
      const account = await this.accountRepository.findAccountByCpf(cpf);
      console.log(account);
      if (!account) {
        throw new Error(INCORRECT_CREDENTIALS);
      }

      const hashedPassword =
        await this.accountRepository.findHashedPasswordByCpf(cpf);

      if (await bcrypt.compare(password, hashedPassword)) {
        const payload: JwtPayload = { cpf };
        const token: string = await this.jwtService.sign(payload);
        return { token };
      } else {
        throw new UnauthorizedException(INCORRECT_CREDENTIALS);
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
