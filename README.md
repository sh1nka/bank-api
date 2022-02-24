## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [Docker](https://www.docker.com/)
- [MySQL](https://www.mysql.com/)

## Iniciando o projeto

Após clonar o projeto, execute

> Para instalar as dependências

```bash
$ yarn install
```

> Para criar a imagem automaticamente através do docker-compose

```bash
$ docker-compose up
```

> O banco de dados, tanto para dev quanto para testes serão criados automaticamente através de um script sql que será executado no docker-compose

> Para iniciar o projeto

```bash
$ yarn start:dev
```

## Testes Unitários

> Para executar os testes

```bash
$ yarn test
```

> Para executar testes específicos

```bash
$ yarn test nome-do-teste
```

### Testes disponíveis:

- create-account
- sign-up-auth
- sign-in-auth
- deposit-operation
- transfer-operation

## Rotas

As rotas disponíveis são:

@Post

- bank/api/v1/account/create
  Utilizada para criar uma conta

@Post

- bank/api/v1/login
  Utilizada para login

@Put

- bank/api/v1/operation/transfer/:cpf
  Utilizada para transferir dinheiro para uma conta através de um CPF

@Post

- bank/api/v1/operation/deposit
  Utilizada para depositar dinheiro na própria conta
