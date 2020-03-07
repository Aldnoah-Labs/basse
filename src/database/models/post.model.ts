import { BaseModel } from './base.model';

export class PostModel extends BaseModel {
  static tableName = 'post';

  personId: number;
  title: string;
  content: string;
}
