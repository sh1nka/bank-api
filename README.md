## Sobre

O projeto visa a disponibilizar determinadas rotas para que seja possível depositar e transferir valores entre contas. Para isso, é necessário que uma conta seja criada a partir de um nome e um cpf acompanhados de uma senha - na qual será necessaria uma autenticação para que seja possivel realizar as operações. É possível criar apenas uma conta por CPF.
Através das operações, o usuário:

- Pode depositar valores em sua conta, desde que seja maior que 0 e menor que 2000.
- Pode transferir valores para outras contas, desde que seja maior que 0 e menor que 2000.
- Não pode transferir para a sua própria conta.

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [Docker](https://www.docker.com/)
- [MySQL](https://www.mysql.com/)

## Dependências necessárias

- [NodeJS](https://nodejs.org/) - Versão 16.10.0
- [Docker-Compose](https://docs.docker.com/compose/install/) - Versão 1.27.0+

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

Segue um arquivo JSON para importar no Insomnia, já com as rotas criadas, o mesmo já se encontra com o token aplicado nas requisições das rotas
[bank-api.json.zip](https://github.com/sh1nka/bank-api/files/8128990/bank-api.json.zip)

O projeto está rodando em sobre a porta **3000**

As rotas disponíveis são:

@Post

- bank/api/v1/account/create

Utilizada para criar uma conta

Campos obrigatórios:

```json
{
  "name": "",
  "cpf": "",
  "password": ""
}
```

Campos opcionais:

```json
{
  "phone": "",
  "email": ""
}
```

@Post

- bank/api/v1/login

Utilizada para login

```json
{
  "cpf": "",
  "password": ""
}
```

@Put

- bank/api/v1/operation/transfer/:cpf

Utilizada para transferir dinheiro para uma conta através de um CPF

```json
{
  "value": 1000
}
```

Obs: O valor deve ser maior que 0, e menor que 2000.

@Post

- bank/api/v1/operation/deposit

Utilizada para depositar dinheiro na própria conta

```json
{
  "value": 1000
}
```

Obs: O valor deve ser maior que 0, e menor que 2000.

## Possíveis problemas

Dependendo da versão do utilizada do Docker-Compose, é possível que o mesmo não consiga executar o arquivo com as especificidades necessárias de acordo com o novo formato do [Docker-Compose File](https://docs.docker.com/compose/compose-file/)
Caso isso ocorra, execute os seguintes comandos:

Criar um novo container

```bash
docker run --name mysql5.7-33900 -e MYSQL_ROOT_PASSWORD=root -p 33900:3306 -d mysql:5.7
```

Iniciar o container

```bash
docker start mysql5.7-33900
```

Acessar a linha de comando dentro do container

```bash
docker exec -it mysql5.7-33900 /bin/bash
```

Acessar o MySQL

```bash
mysql -uroot -p
```

Obs: será pedido uma senha, a mesma é: root

Criar os bancos necessários para o projeto (execute um por vez)

```bash
create database bank_api;
```

```bash
create database bank_api_test;
```

Após isso, execute

```bash
yarn start:dev
```
