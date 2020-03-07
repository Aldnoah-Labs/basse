import * as Knex from 'knex';

const tableName = 'post';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.increments();
    t.integer('person_id')
      .unsigned()
      .notNullable();
    t.string('title').notNullable();
    t.string('content').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
