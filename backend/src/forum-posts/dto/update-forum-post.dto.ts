import { PartialType } from "@nestjs/mapped-types";
import { ForumPost } from "../schemas/forum-post.schema";

export class UpdatedForumPostDto extends PartialType(ForumPost) {}