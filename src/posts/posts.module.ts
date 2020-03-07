import { Module } from '@nestjs/common';
import { PeopleModule } from 'src/people/people.module';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  imports: [PeopleModule],
  providers: [PostsService, PostsResolver],
  exports: [PostsService],
})
export class PostsModule {}
