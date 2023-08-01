import { Types } from "mongoose";
import { Question } from "src/questions/schemas/question.schema";
import { User } from "src/users/shemas/user.schema";

export class CreateGameDto {
    player1Id: string;
    player2Id: string;
}
