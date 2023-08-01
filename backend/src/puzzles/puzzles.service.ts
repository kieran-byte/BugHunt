// puzzles.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Puzzle } from './schemas/puzzle.schema';
import { CreatePuzzleDto } from './dto/create-puzzle.dto';
import { UpdatePuzzleDto } from './dto/update-puzzle.dto';

@Injectable()
export class PuzzlesService {
  constructor(@InjectModel(Puzzle.name) private puzzleModel: Model<Puzzle>) {}

  async findAll(): Promise<Puzzle[]> {
    return this.puzzleModel.find().exec();
  }

  async findOne(id: string): Promise<Puzzle> {
    return this.puzzleModel.findById(id).exec();
  }

  async create(createPuzzleDto: CreatePuzzleDto): Promise<Puzzle> {
    const createdPuzzle = new this.puzzleModel(createPuzzleDto);
    return createdPuzzle.save();
  }

  async update(id: string, updatePuzzleDto: UpdatePuzzleDto): Promise<Puzzle> {
    return this.puzzleModel
      .findByIdAndUpdate(id, updatePuzzleDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Puzzle> {
    return this.puzzleModel.findByIdAndRemove(id).exec();
  }

  async findByTopicAndTask(topic: string, task: string): Promise<Puzzle> {
    const allPuzzles = await this.findAll();
    return allPuzzles.find(
      (puzzle) =>
        puzzle.topic === topic && puzzle.content === task.replace('~', '?'),
    );
  }

  async findByTopicAndIsCurriculum(topic: string): Promise<Puzzle[]> {
    const allPuzzles = await this.findAll();
    return allPuzzles.filter(
      (puzzle) => puzzle.topic === topic && !puzzle.isCustom,
    );
  }

  async findByTopicAndTaskAndIsCurriculum(
    topic: string,
    task: string,
  ): Promise<Puzzle> {
    const allPuzzles = await this.findAll();
    return allPuzzles.find(
      (puzzle) =>
        puzzle.topic === topic && puzzle.content === task && !puzzle.isCustom,
    );
  }

  async findCustomPuzzles(): Promise<Puzzle[]> {
    const allPuzzles = await this.findAll();
    return allPuzzles.filter((puzzle) => puzzle.isCustom);
  }
}
