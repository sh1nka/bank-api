import * as mysql from 'mysql2/promise';
import * as faker from 'faker';
import { Account } from '@modules/account/account.entity';
import { Connection } from 'typeorm';

export const getAccountQuery = (account: Partial<Account>): string => {
  return mysql.format(
    `INSERT INTO account 
  (
    password,
    name,
    balance,
    cpf,
    email,
    phone,
    created_at
  ) 
  VALUES
  ( ?, ?, ?, ?, ?, ?, ?)`,
    [
      account.password,
      account.name,
      account.balance,
      account.cpf,
      account.email,
      account.phone,
      account.created_at,
    ],
  );
};

export const createAccount = async (
  conn: Connection,
  data: Partial<Account> = {},
): Promise<Account> => {
  const account: Partial<Account> = {
    password: '$2b$10$haEzGfyLR7HTWPDResxYBuZVqO.Yj2LfoMa11XeEKVxfCckUWwZ8e',
    name: data.name ?? faker.name.findName(),
    balance: data.balance ?? Math.floor(Math.random() * 500),
    cpf: data.cpf ?? (Math.floor(Math.random() * 500) + 10000000000).toString(),
    email: data.email ?? faker.internet.email(),
    phone: data.phone ?? faker.phone.phoneNumber(),
    created_at: data.created_at ?? new Date(),
  };

  const { insertId } = await conn.query(getAccountQuery(account));

  const [newAccount] = await conn.query(
    `SELECT * FROM account WHERE id = ?`,
    insertId,
  );

  return newAccount as Account;
};
