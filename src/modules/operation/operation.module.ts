import { AccountRepository } from '@modules/account/repositories/account.repository';
import { AuthModule } from '@modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationController } from './controllers/operation.controller';
import { OperationDepositService } from './services/deposit-operation.service';
import { OperationTransferService } from './services/transfer-operation.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountRepository]), AuthModule],
  controllers: [OperationController],
  providers: [OperationDepositService, OperationTransferService],
})
export class OperationModule {}
