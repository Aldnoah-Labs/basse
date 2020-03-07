import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PersonModel } from 'src/database/models/person.model';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Resolver('Person')
export class PeopleResolver {
  constructor(private readonly peopleService: PeopleService) {}

  @Query()
  async person(@Args('id') id: number): Promise<PersonModel> {
    return this.peopleService.findOne(id);
  }

  @Mutation()
  async createPerson(
    @Args('input') args: CreatePersonDto,
  ): Promise<PersonModel> {
    return this.peopleService.create(args);
  }

  @Mutation()
  async updatePerson(
    @Args('input') args: UpdatePersonDto,
  ): Promise<PersonModel> {
    return this.peopleService.update(args);
  }

  @Mutation()
  async deletePerson(@Args('id') id: number): Promise<number> {
    return this.peopleService.delete(id);
  }
}
