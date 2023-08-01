import { Controller } from '@nestjs/common';
import { Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ForumPostsService } from './forum-posts.service';
import { CreateForumPostDto } from './dto/create-forum-post.dto';
import { ForumPost } from './schemas/forum-post.schema';
import { UpdatedForumPostDto } from './dto/update-forum-post.dto';

@Controller('forum-posts')
export class ForumPostsController {
  constructor(private readonly forumPostService: ForumPostsService) {}

  @Post()
  async create(@Body() createForumPostDto: CreateForumPostDto) {
    await this.forumPostService.create(createForumPostDto);
  }

  @Get()
  async findAll(): Promise<ForumPost[]> {
    return this.forumPostService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ForumPost> {
    return this.forumPostService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedForumPostDto: UpdatedForumPostDto,
  ): Promise<ForumPost> {
    return this.forumPostService.update(id, updatedForumPostDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.forumPostService.delete(id);
  }
}
