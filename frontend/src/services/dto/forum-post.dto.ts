import { UserDto } from "./user.dto";

export interface ForumPostDto{
  _id: string;
  title: string;
  content: string;
  creator: UserDto;
  snippet: string;
}

export interface CreateForumPostDto {
  title: string;
  content: string;
  creator: string;
  snippet: string;
}

export interface UpdateForumPostDto {
  title?: string;
  content?: string;
  creator?: string;
  snippet?: string;
}
