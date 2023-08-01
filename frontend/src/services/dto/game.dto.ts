import { QuestionDto } from "./question.dto";
import { UserDto } from "./user.dto";

export interface GameDto {
  _id: string;
  player1: UserDto;
  player2: UserDto;
  questions: QuestionDto[];
  player1Score: number;
  player2Score: number;
  status: string;
}

export interface CreateGameDto {
  player1: string; //id
  player2?: string;
}

export interface UpdateGameDto {
  title?: string;
  description?: string;
  player1?: string; //id
  player2?: string; //id
}
