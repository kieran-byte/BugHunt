import { OmitType } from "@nestjs/mapped-types";
import { Question } from "../schemas/question.schema";

export class CreateQuestionDto extends OmitType(Question, ['_id'] as const) {
}