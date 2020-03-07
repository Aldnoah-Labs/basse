import { Model } from 'objection';

const encode = (id: number | string, type: string): string =>
  Buffer.from(`${id}:${type}`).toString('base64');

export class BaseModel extends Model {
  readonly id: number;

  get _id() {
    return encode(this.id, (this as any).constructor.tableName);
  }
}
