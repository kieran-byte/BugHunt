import { Injectable } from '@nestjs/common';
import { CreateDailyPuzzleDto } from './dto/create-daily-puzzle.dto';
import { UpdateDailyPuzzleDto } from './dto/update-daily-puzzle.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DailyPuzzle } from './schemas/daily-puzzle.schema';

@Injectable()
export class DailyPuzzlesService {
  constructor(
    @InjectModel(DailyPuzzle.name) private dailyPuzzleModel: Model<DailyPuzzle>,
  ) {}

  create(createDailyPuzzleDto: CreateDailyPuzzleDto) {
    const createdPuzzle = new this.dailyPuzzleModel(createDailyPuzzleDto);
    return createdPuzzle.save();
  }

  findAll() {
    return this.dailyPuzzleModel.find().exec();
  }

  findOne(id: string) {
    return this.dailyPuzzleModel.findById(id).exec();
  }

  update(id: string, updateDailyPuzzleDto: UpdateDailyPuzzleDto) {
    return this.dailyPuzzleModel
      .findByIdAndUpdate(id, updateDailyPuzzleDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.dailyPuzzleModel.findByIdAndRemove(id).exec();
  }
}
