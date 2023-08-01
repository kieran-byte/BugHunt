import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DailyPuzzlesService } from './daily-puzzles.service';
import { CreateDailyPuzzleDto } from './dto/create-daily-puzzle.dto';
import { UpdateDailyPuzzleDto } from './dto/update-daily-puzzle.dto';

@Controller('daily-puzzles')
export class DailyPuzzlesController {
  constructor(private readonly dailyPuzzlesService: DailyPuzzlesService) {}

  @Post()
  create(@Body() createDailyPuzzleDto: CreateDailyPuzzleDto) {
    return this.dailyPuzzlesService.create(createDailyPuzzleDto);
  }

  @Get()
  findAll() {
    return this.dailyPuzzlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dailyPuzzlesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDailyPuzzleDto: UpdateDailyPuzzleDto,
  ) {
    return this.dailyPuzzlesService.update(id, updateDailyPuzzleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailyPuzzlesService.remove(id);
  }
}
