import { GetAccount } from '@decorators/get-account-req.decorator';
import { Account } from '@modules/account/account.entity';
import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DepositDto } from '../dto/deposit.dto';
import { TransferDto } from '../dto/transfer.dto';
import { OperationDepositService } from '../services/deposit-operation.service';
import { OperationTransferService } from '../services/transfer-operation.service';

@Controller('operation')
@UseGuards(AuthGuard())
export class OperationController {
  constructor(
    private readonly operationDepositService: OperationDepositService,
    private readonly operationTransferService: OperationTransferService,
  ) {}
  @Post('/deposit')
  async depositOperation(
    @GetAccount() account: Account,
    @Body() body: DepositDto,
  ): Promise<any> {
    return await this.operationDepositService.deposit(account, body);
  }

  @Put('/transfer/:receiver_account_cpf')
  async transferOperation(
    @GetAccount() account: Account,
    @Param('receiver_account_cpf') receiverAccountCpf: string,
    @Body() body: TransferDto,
  ): Promise<any> {
    return await this.operationTransferService.transfer(
      account,
      receiverAccountCpf,
      body,
    );
  }
}
