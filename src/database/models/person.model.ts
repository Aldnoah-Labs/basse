import { BaseModel } from './base.model';

export class PersonModel extends BaseModel {
  static tableName = 'person';

  name: string;
}
