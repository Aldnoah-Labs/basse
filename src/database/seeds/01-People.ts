import * as Knex from 'knex';
import { PersonModel } from '../models/person.model';

export async function seed(knex: Knex): Promise<any> {
  const data = [
    {
      id: 1,
      name: 'John Doe',
    },
    {
      id: 2,
      name: 'Mary Doe',
    },
  ];
  await PersonModel.query(knex).delete();
  for (let i = 0; i < data.length; i += 1) {
    await PersonModel.query(knex).insert(data[i]);
  }
}
