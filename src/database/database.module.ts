import { Global, Module } from '@nestjs/common';
import * as Knex from 'knex';
import { Model } from 'objection';
import { KNEX_CONNECTION } from './constants';
import { PersonModel } from './models/person.model';
import * as config from '../../knexfile';

const models = [PersonModel];

const modelProviders = models.map(model => {
  return {
    provide: model.name,
    useValue: model,
  };
});

const providers = [
  ...modelProviders,
  {
    provide: KNEX_CONNECTION,
    useFactory: async () => {
      const knex = Knex({
        ...config,
        debug: process.env.KNEX_DEBUG === 'true',
      });

      Model.knex(knex);
      return knex;
    },
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
