import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { PostModel } from 'src/database/models/post.model';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @Inject('PostModel')
    private readonly postModel: ModelClass<PostModel>,
  ) {}

  async findAll() {
    return this.postModel.query();
  }

  async findOne(id: number): Promise<PostModel> {
    return this.postModel
      .query()
      .findById(id)
      .throwIfNotFound();
  }

  async create(props: CreatePostDto): Promise<PostModel> {
    return this.postModel.query().insert(props);
  }

  async update(props: UpdatePostDto): Promise<PostModel> {
    const data = await this.findOne(props.id);
    return data.$query().updateAndFetch(props);
  }

  async delete(id: number): Promise<number> {
    const data = await this.findOne(id);
    return data.$query().delete();
  }
}
