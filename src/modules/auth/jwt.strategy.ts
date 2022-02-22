import { INCORRECT_CREDENTIALS } from '@common/messages';
import { Account } from '@modules/account/account.entity';
import { AccountRepository } from '@modules/account/repositories/account.repository';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './dto/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private accountRepository: AccountRepository,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<Account> {
    try {
      const { cpf } = payload;
      const account = await this.accountRepository.findAccountByCpf(cpf);

      if (!account) {
        throw new UnauthorizedException(INCORRECT_CREDENTIALS);
      }
      return account;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
