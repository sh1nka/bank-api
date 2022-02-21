import { BankApiDbProvider } from '@config/connection/bank-api-db.connection';
import { configValidationSchema } from '@config/connection/config.schema';
import { AccountModule } from '@modules/account/account.module';
import { AuthModule } from '@modules/auth/auth.module';
import { OperationModule } from '@modules/operation/operation.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    ...BankApiDbProvider,
    AuthModule,
    AccountModule,
    OperationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
