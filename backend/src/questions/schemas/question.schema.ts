import { Type } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Puzzle } from 'src/puzzles/schemas/puzzle.schema';

export type QuestionDocument = HydratedDocument<Question>

@Schema()
export class Question extends Puzzle{
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
