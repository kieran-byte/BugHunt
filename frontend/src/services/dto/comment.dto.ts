import { UserDto } from "./user.dto";

export interface CommentDto {
  _id: string;
  content: string;
  creator: UserDto;
  post: string;
  question: string;
  createdAt: Date;
  parentComment: string;
}

export interface CreateCommentDto {
  content: string;
  creator: string;
  post?: string;
  puzzle?: string;
  parentComment?: string;
}
