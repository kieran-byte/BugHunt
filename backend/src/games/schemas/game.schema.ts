import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose, Types } from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Question } from 'src/questions/schemas/question.schema';
import { User } from 'src/users/shemas/user.schema';

export type GameDocument = HydratedDocument<Game>;

@Schema()
export class Game {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  player1: User;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  player2: User;

  @Prop({ type: Types.ObjectId, ref: 'Question', required: true })
  questions: Question[];

  @Prop({ default: 0, equired: true })
  player1Score: number;

  @Prop({ default: 0, equired: true })
  player2Score: number;

  @Prop({ default: 'ongoing', equired: true }) // 'ongoing', 'player1won', 'player2won'
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  winner: User;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  loser: User;
}

export const GameSchema = SchemaFactory.createForClass(Game);
