import { BankApiDbTestProvider } from '@config/connection/bank-api-db-test.provider';
import { AuthModule } from '@modules/auth/auth.module';
import { AuthSignUpService } from '@modules/auth/services/sign-up-auth.service';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';
import { AccountModule } from '../account.module';
import { CreateAccountDto } from '../dto/create-account.dto';
import { AccountRepository } from '../repositories/account.repository';
import { CreateAccountService } from '../services/create-account.service';

describe('Account Services Unit Tests', () => {
  let createAccountService: CreateAccountService;
  let authSignUpService: AuthSignUpService;
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
        AccountModule,
      ],
      controllers: [],
      providers: [],
    }).compile();

    connection = module.get<Connection>(Connection);
    createAccountService =
      module.get<CreateAccountService>(CreateAccountService);
    authSignUpService = module.get<AuthSignUpService>(AuthSignUpService);
    repository = module.get<AccountRepository>(AccountRepository);
  });

  afterEach(async () => {
    await connection.synchronize(true);
    await connection.close();
  });

  it('Create Account Service should be defined', () => {
    expect(createAccountService).toBeDefined();
  });

  it('Auth Service should be defined', () => {
    expect(authSignUpService).toBeDefined();
  });

  it('Repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('Should successfully create an account', async () => {
    const data: CreateAccountDto = {
      name: 'Teste',
      cpf: '44921449864',
      password: '102030',
      phone: '11999999999',
      email: 'thomas.shinkarenko@gmail.com',
    };
    const spyCreateAccountService = jest.spyOn(
      createAccountService,
      'createAccount',
    );
    const spyAuthSignUpService = jest.spyOn(authSignUpService, 'signUp');
    const spyRepositoryFindAccountCpf = jest.spyOn(
      repository,
      'findAccountCpf',
    );
    const spyRepositorySaveAccount = jest.spyOn(repository, 'saveAccount');

    await createAccountService.createAccount(data);
    expect(spyCreateAccountService).toBeCalledTimes(1);
    expect(spyRepositoryFindAccountCpf).toBeCalledTimes(1);
    expect(spyAuthSignUpService).toBeCalledTimes(1);
    expect(spyRepositorySaveAccount).toBeCalledTimes(2);
  });
});
