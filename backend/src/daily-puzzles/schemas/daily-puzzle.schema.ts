import { Puzzle } from 'src/puzzles/schemas/puzzle.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type DailyPuzzleDocument = HydratedDocument<DailyPuzzle>;

export class DailyPuzzle extends Puzzle {}

export const DailyPuzzleSchema = SchemaFactory.createForClass(DailyPuzzle);
