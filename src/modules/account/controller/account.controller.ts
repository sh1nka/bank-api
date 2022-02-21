import { Body, Controller, Post } from '@nestjs/common';
import { CreateAccountDto } from '../dto/create-account.dto';
import { CreateAccountService } from '../services/create-account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly createAccountService: CreateAccountService) {}
  @Post('/create')
  async createAccount(@Body() body: CreateAccountDto): Promise<any> {
    return await this.createAccountService.createAccount(body);
  }
}
