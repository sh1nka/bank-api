import { AuthSignUpService } from '@modules/auth/services/sign-up-auth.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './controllers/account.controller';
import { AccountRepository } from './repositories/account.repository';
import { CreateAccountService } from './services/create-account.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountRepository])],
  controllers: [AccountController],
  providers: [CreateAccountService, AuthSignUpService],
})
export class AccountModule {}
