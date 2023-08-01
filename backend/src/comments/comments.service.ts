import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const createCommentDtoWithObjectId = {
      ...createCommentDto,
      creator: new ObjectId(createCommentDto.creator),
      post: createCommentDto.post ? new ObjectId(createCommentDto.post) : undefined,
      puzzle: createCommentDto.puzzle ? new ObjectId(createCommentDto.puzzle) : undefined,
      parentComment: createCommentDto.parentComment ? new ObjectId(createCommentDto.parentComment) : undefined,
    };
    const createdComment = new this.commentModel(createCommentDtoWithObjectId);
    return createdComment.save();
  }

  async findByQuestionId(questionId: string): Promise<Comment[]> {
    return this.commentModel
      .find({
        question: new ObjectId(questionId),
        comments: { $exists: true, $not: { $size: 0 } },
      })
      .populate('creator')
      .exec();
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }

  async findOne(id: string): Promise<Comment> {
    let comment: Comment;
    try {
      comment = await this.commentModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find comment.');
    }
    if (!comment) {
      throw new NotFoundException('Could not find comment.');
    }
    return comment;
  }

  async findByPostId(postId: string): Promise<Comment[]> {
    return this.commentModel
      .find({
        post: new ObjectId(postId),
        parentComment: { $exists: false },
      })
      .populate('creator')
      .exec();
  }

  async findByParentCommentId(parentCommentId: string): Promise<Comment[]> {
    return this.commentModel
      .find({ parentComment: new ObjectId(parentCommentId) })
      .populate('creator')
      .exec();
  }
}
