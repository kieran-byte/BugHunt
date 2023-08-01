import axios from 'axios';
import { CreateCommentDto } from './dto/comment.dto';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getComments = () => {
  return axios.get(`${API_BASE_URL}/comments`);
};

export const getComment = (id: string) => {
  return axios.get(`${API_BASE_URL}/comments/${id}`);
};

export const getCommentsByPostId = (postId: string) => {
  return axios.get(`${API_BASE_URL}/comments/post/${postId}`);
};

export const getCommentsByQuestionId = (questionId: string) => {
  return axios.get(`${API_BASE_URL}/comments/question/${questionId}`);
};

export const createComment = (dto: CreateCommentDto) => {
  return axios.post(`${API_BASE_URL}/comments`, dto);
};

export const getCommentsByParentCommentId = (parentCommentId: string) => {
  return axios.get(`${API_BASE_URL}/comments/parent/${parentCommentId}`);
};

