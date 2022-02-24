import { BankApiDbTestProvider } from '@config/connection/bank-api-db-test.provider';
import { Account } from '@modules/account/account.entity';
import { AccountRepository } from '@modules/account/repositories/account.repository';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { createAccount } from '@test/factories/create-account';
import { Connection } from 'typeorm';
import { DepositDto } from '../dto/deposit.dto';
import { OperationModule } from '../operation.module';
import { OperationDepositService } from '../services/deposit-operation.service';

describe('Deposit Service Unit Tests', () => {
  let service: OperationDepositService;
  let repository: AccountRepository;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: [`.env.stage.${process.env.STAGE}`],
        }),
        ...BankApiDbTestProvider,
        OperationModule,
      ],
      controllers: [],
      providers: [],
    }).compile();

    connection = module.get<Connection>(Connection);
    service = module.get<OperationDepositService>(OperationDepositService);
    repository = module.get<AccountRepository>(AccountRepository);
  });

  afterEach(async () => {
    await connection.synchronize(true);
    await connection.close();
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('Should successfully deposit value into account', async () => {
    const account: Account = await createAccount(connection);

    const data: DepositDto = {
      value: 1000,
    };

    const spyDepositService = jest.spyOn(service, 'deposit');

    const spyRepositoryFindAccountCpf = jest.spyOn(
      repository,
      'findAccountCpf',
    );

    const spyRepositoryUpdateBalance = jest.spyOn(repository, 'updateBalance');

    await service.deposit(account, data);

    expect(spyDepositService).toHaveBeenCalledTimes(1);
    expect(spyRepositoryFindAccountCpf).toHaveBeenCalledTimes(1);
    expect(spyRepositoryUpdateBalance).toHaveBeenCalledTimes(1);
  });
});
