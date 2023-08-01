import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ForumPost } from './schemas/forum-post.schema';
import { Model } from 'mongoose';
import { CreateForumPostDto } from './dto/create-forum-post.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdatedForumPostDto } from './dto/update-forum-post.dto';

@Injectable()
export class ForumPostsService {
    constructor(@InjectModel(ForumPost.name) private forumPostModel: Model<ForumPost>) {}

    async create(createForumPost: CreateForumPostDto): Promise<ForumPost> {
      const createdForumPost = new this.forumPostModel(createForumPost);
      return createdForumPost.save();
    }
  
    async findAll(): Promise<ForumPost[]> {
      return this.forumPostModel.find().populate('creator').sort({timestamp: -1}).exec();
    }    
  
    async findOne(id: string): Promise<ForumPost> {
      let forumPost: ForumPost;
      try {
        forumPost = await this.forumPostModel.findById(id).exec();
      } catch (error) {
        throw new NotFoundException('Could not find forum post.');
      }
      if (!forumPost) {
        throw new NotFoundException('Could not find forum post.');
      }
      return forumPost;
    }
  
    async update(id: string, updatedForumPostDto: UpdatedForumPostDto): Promise<ForumPost> {
      const updatedForumPost = await this.forumPostModel
        .findByIdAndUpdate(id, updatedForumPostDto, { new: true })
        .exec();
      if (!updatedForumPost) {
        throw new NotFoundException('Could not find forum post.');
      }
      return updatedForumPost;
    }
  
    async delete(id: string): Promise<any> {
      const result = await this.forumPostModel.deleteOne({ _id: id }).exec();
      if (result.deletedCount === 0) {
        throw new NotFoundException('Could not find forum post.');
      }
      return result;
    }
}
