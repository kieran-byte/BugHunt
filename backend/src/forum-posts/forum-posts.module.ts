import { Module } from '@nestjs/common';
import { ForumPostsService } from './forum-posts.service';
import { ForumPostsController } from './forum-posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ForumPost, ForumPostSchema } from './schemas/forum-post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ForumPost.name, schema: ForumPostSchema },
    ]),
  ],
  providers: [ForumPostsService],
  controllers: [ForumPostsController],
  exports: [ForumPostsService, ForumPostsModule],
})
export class ForumPostsModule {}
