import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './schemas/question.schema';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
    constructor(@InjectModel(Question.name) private questionModel: Model<Question>) {}

    async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
      const createdQuestion = new this.questionModel(createQuestionDto);
      return createdQuestion.save();
    }
  
    async findAll(): Promise<Question[]> {
      return this.questionModel.find().exec();
    }
  
    async findOne(id: string): Promise<Question> {
      let question: Question;
      try {
        question = await this.questionModel.findById(id).exec();
      } catch (error) {
        throw new NotFoundException('Could not find question.');
      }
      if (!question) {
        throw new NotFoundException('Could not find question.');
      }
      return question;
    }
  
    async update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
      const updatedQuestion = await this.questionModel
        .findByIdAndUpdate(id, updateQuestionDto, { new: true })
        .exec();
      if (!updatedQuestion) {
        throw new NotFoundException('Could not find question.');
      }
      return updatedQuestion;
    }
  
    async delete(id: string): Promise<any> {
      const result = await this.questionModel.deleteOne({ _id: id }).exec();
      if (result.deletedCount === 0) {
        throw new NotFoundException('Could not find question.');
      }
      return result;
    }

    async findRandom(n: number): Promise<Question[]> {
      return this.questionModel.aggregate([{ $sample: { size: n } }]);
    }
}
