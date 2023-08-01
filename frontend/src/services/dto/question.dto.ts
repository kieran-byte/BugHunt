import { PuzzleDto } from "./puzzle.dto";

export interface QuestionDto extends PuzzleDto {}

export interface CreateQuestionDto {
  content: string;
  answer: string;
  explanation?: string;
  snippet: string;
  game: string; 
}

export interface UpdateQuestionDto {
  content?: string;
  answer?: string;
  explanation?: string;
  snippet?: string;
  game?: string; 
}
