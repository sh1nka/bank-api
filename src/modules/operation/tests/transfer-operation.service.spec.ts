import { BankApiDbTestProvider } from '@config/connection/bank-api-db-test.provider';
import { Account } from '@modules/account/account.entity';
import { AccountRepository } from '@modules/account/repositories/account.repository';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { createAccount } from '@test/factories/create-account';
import { Connection } from 'typeorm';
import { TransferDto } from '../dto/transfer.dto';
import { OperationModule } from '../operation.module';
import { OperationTransferService } from '../services/transfer-operation.service';

describe('Transfer Service Unit Tests', () => {
  let service: OperationTransferService;
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
    service = module.get<OperationTransferService>(OperationTransferService);
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

  it('Should successfully transfer value into another account', async () => {
    const account: Account = await createAccount(connection, {
      balance: 1000,
    });
    const receiverAccount: Account = await createAccount(connection);

    const data: TransferDto = {
      value: 1000,
    };

    const spyTransferService = jest.spyOn(service, 'transfer');

    const spyRepositoryFindAccountByCpf = jest.spyOn(
      repository,
      'findAccountByCpf',
    );

    const spyRepositoryUpdateBalance = jest.spyOn(repository, 'updateBalance');

    await service.transfer(account, receiverAccount.cpf, data);

    expect(spyTransferService).toHaveBeenCalledTimes(1);
    expect(spyRepositoryFindAccountByCpf).toHaveBeenCalledTimes(1);
    expect(spyRepositoryUpdateBalance).toHaveBeenCalledTimes(2);
  });
});
