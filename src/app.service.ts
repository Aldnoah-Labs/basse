import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { PersonModel } from './database/models/person.model';

@Injectable()
export class AppService {
  constructor(
    @Inject('PersonModel')
    private readonly personModel: ModelClass<PersonModel>,
  ) {}

  getHello(): string {
    // test
    this.personModel
      .query()
      .findById(1)
      .then(person => {
        console.log(person.name === 'John Doe');
      });

    return 'Hello World!';
  }
}
