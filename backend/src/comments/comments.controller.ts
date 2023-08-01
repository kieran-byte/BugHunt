import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    await this.commentsService.create(createCommentDto);
  }

  @Get()
  async findAll(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentsService.findOne(id);
  }

  @Get('post/:postId')
  async findByPostId(@Param('postId') postId: string): Promise<Comment[]> {
    return this.commentsService.findByPostId(postId);
  }

  @Get('question/:questionId')
  async findByQuestionId(
    @Param('questionId') questionId: string,
  ): Promise<Comment[]> {
    return this.commentsService.findByQuestionId(questionId);
  }

  @Get('parent/:parentCommentId')
  async findByParentCommentId(
    @Param('parentCommentId') parentCommentId: string,
  ): Promise<Comment[]> {
    return this.commentsService.findByParentCommentId(parentCommentId);
  }
}
