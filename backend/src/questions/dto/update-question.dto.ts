import { PartialType } from "@nestjs/mapped-types";
import { Question } from "../schemas/question.schema";

export class UpdateQuestionDto extends PartialType(Question) {}