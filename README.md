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

> Para executar os testes

```bash
$ yarn test
```

> Para executar testes específicos

```bash
$ yarn test nome-do-teste
```

Testes disponíveis:

- create-account
- sign-up-auth
- sign-in-auth
- deposit-operation
- transfer-operation
