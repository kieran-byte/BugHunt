import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from './schemas/game.schema';
import { CreateGameDto } from './dto/create-game.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  async create(@Body() createGameDto: CreateGameDto) {
    await this.gamesService.create(createGameDto);
  }

  @Get()
  async findAll(): Promise<Game[]> {
    return this.gamesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Game> {
    return this.gamesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() game: Game): Promise<Game> {
    return this.gamesService.update(id, game);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.gamesService.delete(id);
  }
}
