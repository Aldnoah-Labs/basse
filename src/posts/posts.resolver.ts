import { UsePipes } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  Resolver,
  ResolveProperty,
} from '@nestjs/graphql';
import { PersonModel } from 'src/database/models/person.model';
import { PostModel } from 'src/database/models/post.model';
import { PeopleService } from '../people/people.service';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DecodeIdPipe } from 'src/decode-id.pipe';

@Resolver('Post')
@UsePipes(new DecodeIdPipe(PostModel))
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly peopleService: PeopleService,
  ) {}

  @Query()
  async posts(): Promise<PostModel[]> {
    return this.postsService.findAll();
  }

  @Query()
  async post(@Args('id') id: number): Promise<PostModel> {
    return this.postsService.findOne(id);
  }

  @ResolveProperty()
  async author(@Parent() post): Promise<PersonModel> {
    return this.peopleService.findOne(post.personId);
  }

  @Mutation()
  async createPost(@Args('input') args: CreatePostDto): Promise<PostModel> {
    return this.postsService.create(args);
  }

  @Mutation()
  async updatePost(@Args('input') args: UpdatePostDto): Promise<PostModel> {
    return this.postsService.update(args);
  }

  @Mutation()
  async deletePost(@Args('id') id: number): Promise<number> {
    return this.postsService.delete(id);
  }
}
