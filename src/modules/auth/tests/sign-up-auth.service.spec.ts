import { BankApiDbTestProvider } from '@config/connection/bank-api-db-test.provider';
import { CreateAccountDto } from '@modules/account/dto/create-account.dto';
import { AccountRepository } from '@modules/account/repositories/account.repository';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';
import { AuthModule } from '../auth.module';
import { AuthSignUpService } from '../services/sign-up-auth.service';

describe('Sign Up Auth Service Unit Tests', () => {
  let service: AuthSignUpService;
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
    service = module.get<AuthSignUpService>(AuthSignUpService);
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

  it('Should successfully save an account', async () => {
    const data: CreateAccountDto = {
      name: 'Teste',
      cpf: '44921449864',
      password: '102030',
      phone: '11999999999',
      email: 'thomas.shinkarenko@gmail.com',
    };
    const spySignUpService = jest.spyOn(service, 'signUp');

    const spyRepositorySaveAccount = jest.spyOn(repository, 'saveAccount');

    await service.signUp(data);

    expect(spySignUpService).toHaveBeenCalledTimes(1);
    expect(spyRepositorySaveAccount).toHaveBeenCalledTimes(1);
  });
});
