import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ForumPost } from 'src/forum-posts/schemas/forum-post.schema';
import { User } from 'src/users/shemas/user.schema';
import { Puzzle } from 'src/puzzles/schemas/puzzle.schema';
import { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ required: true, type: String })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  creator: User;

  @Prop({
    type: Types.ObjectId,
    ref: 'ForumPost',
    required: function () {
      return !this.puzzle;
    },
    validate: {
      validator: function () {
        return !this.puzzle;
      },
      message: (props) =>
        'A comment cannot belong to both a post and a question!',
    },
  })
  post: ForumPost;

  @Prop({
    type: Types.ObjectId,
    ref: 'Puzzle',
    required: function () {
      return !this.post;
    },
    validate: {
      validator: function () {
        return !this.post;
      },
      message: (props) =>
        'A comment cannot belong to both a post and a question!',
    },
  })
  puzzle: Puzzle;

  @Prop({ required: true, type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'Comment' })
  parentComment: Comment;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
