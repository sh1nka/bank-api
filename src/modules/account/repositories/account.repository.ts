import { EntityRepository, Repository } from 'typeorm';
import { Account } from '../account.entity';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateBalanceDto } from '../dto/update-balance.dto';

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
  async saveAccount(body: CreateAccountDto): Promise<void> {
    await this.save(body);
  }

  async updateBalance(data: UpdateBalanceDto): Promise<void> {
    await this.createQueryBuilder()
      .update(Account)
      .set({ balance: data.balance })
      .where({ id: data.id })
      .execute();
  }

  async findAccountCpf(cpf: string): Promise<string> {
    const accountCpf = this.createQueryBuilder()
      .select('cpf')
      .where({ cpf })
      .getRawOne();
    return accountCpf;
  }

  async findAccountBalanceById(id: string): Promise<number> {
    const { balance } = await this.createQueryBuilder()
      .select('balance')
      .where('id = :id', { id })
      .getRawOne();
    return balance;
  }

  async findAccountByCpf(cpf: string): Promise<Account> {
    console.log('cpfrepo', cpf);
    return await this.findOne({ cpf });
  }

  async findHashedPasswordByCpf(cpf: string): Promise<string> {
    const { password } = await this.createQueryBuilder()
      .select('password')
      .where('cpf = :cpf', { cpf })
      .getRawOne();
    console.log('password', password);
    return password;
  }
}
