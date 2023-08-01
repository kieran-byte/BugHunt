import { ForumPost } from "src/forum-posts/schemas/forum-post.schema";
import { Puzzle } from "src/puzzles/schemas/puzzle.schema";
import { User } from "src/users/shemas/user.schema";

export class CreateCommentDto {
  content: string;
  creator: string;
  post?: string;
  puzzle?: string;
  parentComment?: string;
}
