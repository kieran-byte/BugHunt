import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ForumPostsModule } from './forum-posts/forum-posts.module';
import { CommentsModule } from './comments/comments.module';
import { QuestionsModule } from './questions/questions.module';
import { GamesModule } from './games/games.module';
import { PuzzlesModule } from './puzzles/puzzles.module';
import { DailyPuzzlesModule } from './daily-puzzles/daily-puzzles.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    UsersModule,
    ForumPostsModule,
    CommentsModule,
    QuestionsModule,
    GamesModule,
    PuzzlesModule,
    DailyPuzzlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
