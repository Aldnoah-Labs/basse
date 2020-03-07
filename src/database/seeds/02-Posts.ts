import * as Knex from 'knex';
import { PostModel } from '../models/post.model';
import { mockData } from '../mock';

const { postsMock } = mockData;

export async function seed(knex: Knex): Promise<any> {
  await PostModel.query(knex).delete();
  for (let i = 0; i < postsMock.length; i += 1) {
    await PostModel.query(knex).insert(postsMock[i]);
  }
}
