import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { PersonModel } from 'src/database/models/person.model';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PeopleService {
  constructor(
    @Inject('PersonModel')
    private readonly personModel: ModelClass<PersonModel>,
  ) {}

  async findAll() {
    return this.personModel.query();
  }

  async findOne(id: number): Promise<PersonModel> {
    return this.personModel
      .query()
      .findById(id)
      .throwIfNotFound();
  }

  async create(props: CreatePersonDto): Promise<PersonModel> {
    return this.personModel.query().insert(props);
  }

  async update(props: UpdatePersonDto): Promise<PersonModel> {
    const data = await this.findOne(props.id);
    return data.$query().updateAndFetch(props);
  }

  async delete(id: number): Promise<number> {
    const data = await this.findOne(id);
    return data.$query().delete();
  }
}
