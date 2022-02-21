import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetAccount } from 'src/decorators/get-account-req.decorator';
import { DepositOperationDto } from '../dto/deposit-operation.dto';

@Controller('operation')
@UseGuards(AuthGuard())
export class OperationController {
  @Post('/deposit')
  async depositOperation(
    @GetAccount() account: any,
    @Body() body: DepositOperationDto,
  ): Promise<any> {
    console.log('conta', account);
    return;
  }

  @Put('/transfer/:id')
  async transferOperation(): Promise<any> {
    return;
  }
}
