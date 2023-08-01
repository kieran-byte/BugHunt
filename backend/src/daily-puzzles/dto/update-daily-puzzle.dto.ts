import { PartialType } from '@nestjs/mapped-types';
import { CreateDailyPuzzleDto } from './create-daily-puzzle.dto';

export class UpdateDailyPuzzleDto extends PartialType(CreateDailyPuzzleDto) {}
