import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ForumPostDocument = HydratedDocument<ForumPost>;

@Schema()
export class ForumPost {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true})
  creator: string;

  @Prop()
  snippet: string;

  @Prop({ type: Date, default: Date.now, required: true })
  timestamp: Date;
}

export const ForumPostSchema = SchemaFactory.createForClass(ForumPost);