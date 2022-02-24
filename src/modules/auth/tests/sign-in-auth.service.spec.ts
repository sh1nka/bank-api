import { BankApiDbTestProvider } from '@config/connection/bank-api-db-test.provider';
import { Account } from '@modules/account/account.entity';
import { AccountRepository } from '@modules/account/repositories/account.repository';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { createAccount } from '@test/factories/create-account';
import { Connection } from 'typeorm';
import { AuthModule } from '../auth.module';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { AuthSignInService } from '../services/sign-in-auth.service';

describe('Sign In Auth Service Unit Tests', () => {
  let service: AuthSignInService;
  let repository: AccountRepository;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: [`.env.stage.${process.env.STAGE}`],
        }),
        ...BankApiDbTestProvider,
        AuthModule,
      ],
      controllers: [],
      providers: [],
    }).compile();

    connection = module.get<Connection>(Connection);
    service = module.get<AuthSignInService>(AuthSignInService);
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

  it('Should successfully generate a token', async () => {
    const account: Account = await createAccount(connection);

    const data: AuthCredentialsDto = {
      cpf: account.cpf,
      password: '102030',
    };
    const spySignInService = jest.spyOn(service, 'signIn');

    const spyRepositoryFindAccountByCpf = jest.spyOn(
      repository,
      'findAccountByCpf',
    );

    const token = await service.signIn(data);
    console.log(token);
    expect(spySignInService).toHaveBeenCalledTimes(1);
    expect(spyRepositoryFindAccountByCpf).toHaveBeenCalledTimes(1);
    expect(token).toBeDefined();
  });
});
