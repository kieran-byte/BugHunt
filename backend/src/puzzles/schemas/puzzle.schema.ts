import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PuzzleDocument = HydratedDocument<Puzzle>;

@Schema({ _id: false })
class CorrectCodeChunkIndexType {
  @Prop({ required: true, type: Number })
  row: number;

  @Prop({ required: true, type: Number })
  col: number;
}

@Schema()
export class Puzzle {
  _id: Types.ObjectId;

  @Prop({ required: true, type: String })
  content: string;

  @Prop({ required: true, type: String })
  answer: string;

  @Prop({ required: true, type: String })
  snippet: string;

  @Prop({ required: true, type: String })
  topic: string;

  @Prop({ required: true, type: CorrectCodeChunkIndexType })
  correctCodeChunkIndex: CorrectCodeChunkIndexType;

  @Prop({ required: true, type: Boolean, default: false })
  isCustom: boolean;

  @Prop({ required: true, type: [String] })
  options: string[];

  @Prop({ required: true, type: String })
  hint: string;

  @Prop({ required: true, type: String })
  explanation: string;
}

export const PuzzleSchema = SchemaFactory.createForClass(Puzzle);
