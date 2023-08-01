import { Module } from '@nestjs/common';
import { PuzzlesService } from './puzzles.service';
import { PuzzlesController } from './puzzles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Puzzle, PuzzleSchema } from './schemas/puzzle.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Puzzle.name, schema: PuzzleSchema }])],
  controllers: [PuzzlesController],
  providers: [PuzzlesService]
})
export class PuzzlesModule {}
