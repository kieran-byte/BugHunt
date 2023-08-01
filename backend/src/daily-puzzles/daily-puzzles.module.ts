import { Module } from '@nestjs/common';
import { DailyPuzzlesService } from './daily-puzzles.service';
import { DailyPuzzlesController } from './daily-puzzles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyPuzzle, DailyPuzzleSchema } from './schemas/daily-puzzle.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DailyPuzzle.name, schema: DailyPuzzleSchema },
    ]),
  ],
  controllers: [DailyPuzzlesController],
  providers: [DailyPuzzlesService],
})
export class DailyPuzzlesModule {}
