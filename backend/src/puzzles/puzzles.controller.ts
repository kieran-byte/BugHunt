// puzzles.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePuzzleDto } from './dto/create-puzzle.dto';
import { UpdatePuzzleDto } from './dto/update-puzzle.dto';
import { PuzzlesService } from './puzzles.service';

@Controller('puzzles')
export class PuzzlesController {
  constructor(private readonly puzzlesService: PuzzlesService) {}

  @Get()
  findAll() {
    return this.puzzlesService.findAll();
  }

  @Get('custom')
  findCustomPuzzles() {
    return this.puzzlesService.findCustomPuzzles();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.puzzlesService.findOne(id);
  }

  @Post()
  create(@Body() createPuzzleDto: CreatePuzzleDto) {
    return this.puzzlesService.create(createPuzzleDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePuzzleDto: UpdatePuzzleDto) {
    return this.puzzlesService.update(id, updatePuzzleDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.puzzlesService.delete(id);
  }

  @Get('topic/:topic')
  findByTopic(@Param('topic') topic: string) {
    return this.puzzlesService.findByTopicAndIsCurriculum(topic);
  }

  @Get(':topic/:task')
  findByTopicAndTask(
    @Param('topic') topic: string,
    @Param('task') task: string,
  ) {
    return this.puzzlesService.findByTopicAndTask(topic, task);
  }

  @Get(':topic/:task/curriculum')
  findByTopicAndTaskAndIsCurriculum(
    @Param('topic') topic: string,
    @Param('task') task: string,
  ) {
    return this.puzzlesService.findByTopicAndTask(topic, task);
  }
}
