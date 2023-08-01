import { PartialType } from "@nestjs/mapped-types";
import { Game } from "../schemas/game.schema";

export class UpdateGameDto extends PartialType(Game) {}