<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Docker

```bash
# Baixar a imagem (caso não tenha), criar o banco e rodar os containers automaticamente.
$ docker compose up -d

# Verifica se esta rodando
$ docker ps

# Para o serviço
$ docker compose down

# Para  e remove os volumes(dados serão apagados)
$ docker compose down -v
```

## Prisma

```bash
# Inicia o prisma
$ npx prisma init

# Gera as migration
$ npx prisma migrate dev

# Ver o banco de dados
$ npx prisma studio
```

<!-- ## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
 -->
