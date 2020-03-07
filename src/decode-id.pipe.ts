import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { Model, ModelClass } from 'objection';

const decode = (id): { id: number; type: string } => {
  const decoded = Buffer.from(String(id), 'base64').toString('utf8');
  const strings = decoded.split(':');
  return {
    id: parseInt(strings[0], 10),
    type: strings[1],
  };
};

@Injectable()
export class DecodeIdPipe implements PipeTransform<any, number> {
  constructor(private readonly model: ModelClass<Model>) {}

  transform(value: any, { type: t, metatype, data }: ArgumentMetadata) {
    // so it can be resolver-scoped
    if (t === 'body' && data === 'id' && metatype === Number) {
      const { id, type } = decode(value);
      if (type !== this.model.tableName) {
        throw new BadRequestException('Malformed ID error');
      }
      return id;
    }
    return value;
  }
}
