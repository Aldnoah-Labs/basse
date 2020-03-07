import * as Knex from 'knex';
import { PersonModel } from '../models/person.model';
import { mockData } from '../mock';

const { peopleMock } = mockData;

export async function seed(knex: Knex): Promise<any> {
  await PersonModel.query(knex).delete();
  for (let i = 0; i < peopleMock.length; i += 1) {
    await PersonModel.query(knex).insert(peopleMock[i]);
  }
}
