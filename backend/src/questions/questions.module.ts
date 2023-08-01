import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './schemas/question.schema';
import { ForumPostsModule } from 'src/forum-posts/forum-posts.module';
import { ForumPostsService } from 'src/forum-posts/forum-posts.service';
import { ForumPost, ForumPostSchema } from 'src/forum-posts/schemas/forum-post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }]), 
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
