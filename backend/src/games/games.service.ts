import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from './schemas/game.schema';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { QuestionsService } from 'src/questions/questions.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/shemas/user.schema';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<Game>,
    private questionService: QuestionsService,
    private usersService: UsersService,
  ) {}

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const [player1, player2, questions] = await Promise.all([
      this.usersService.findOne(createGameDto.player1Id),
      this.usersService.findOne(createGameDto.player2Id),
      this.questionService.findRandom(3), // 3 questions each game
    ]);
    const results = { player1, player2, questions };
    const createdGame = new this.gameModel(results);
    return createdGame.save();
  }

  async findAll(): Promise<Game[]> {
    return this.gameModel.find().exec();
  }

  async findOne(id: string): Promise<Game> {
    let game: Game;
    try {
      game = await this.gameModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find game.');
    }
    if (!game) {
      throw new NotFoundException('Could not find game.');
    }
    return game;
  }

  async update(id: string, updateGameDto: UpdateGameDto): Promise<Game> {
    const updatedGame = await this.gameModel
      .findByIdAndUpdate(id, updateGameDto, { new: true })
      .exec();
    if (!updatedGame) {
      throw new NotFoundException('Could not find game.');
    }
    return updatedGame;
  }

  async updateScore(
    gameId: string,
    playerId: string,
    increment: number,
  ): Promise<Game> {
    const game = await this.findOne(gameId);
    if (!game) throw new NotFoundException('Game not found');
    if (game.player1._id.toString() === playerId) {
      game.player1Score += increment;
    } else if (game.player2._id.toString() === playerId) {
      game.player2Score += increment;
    } else {
      throw new NotFoundException('Player not found in the specified game');
    }
    return this.update(gameId, game);
  }

  async updateElo(userId: string, increment: number): Promise<User> {
    const user = await this.usersService.findOne(userId);
    if (!user) throw new NotFoundException('User not found');
    user.elo += increment;
    return this.usersService.update(userId, user);
  }

  async delete(id: string): Promise<any> {
    const result = await this.gameModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find game.');
    }
    return result;
  }
}
