## Description

NestJS project

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Migration

```bash
# migrate to latest
$ yarn migrate

# make migration
$ yarn migrate:make <name>

# rollback all
$ yarn knex migrate:rollback --all
```

## Seed

```bash
# perform seed all
$ yarn seed

# make seed
$ yarn seed:make <name>
```

## Before start the app

- copy .env.example to .env
- create database on mysql

## Open graphql
- in browser goto localhost:3000/graphql