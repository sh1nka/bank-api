import { AuthModule } from '@modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { OperationController } from './controllers/operation.controller';

@Module({
  imports: [AuthModule],
  controllers: [OperationController],
  providers: [],
})
export class OperationModule {}
