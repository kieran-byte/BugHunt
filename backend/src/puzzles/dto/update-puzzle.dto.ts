import { PartialType } from "@nestjs/mapped-types";
import { Puzzle } from "../schemas/puzzle.schema";

export class UpdatePuzzleDto extends PartialType(Puzzle) {}