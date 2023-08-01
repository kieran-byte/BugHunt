import axios from 'axios';
import { CreateForumPostDto, UpdateForumPostDto } from './dto/forum-post.dto';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getForumPosts = () => {
  return axios.get(`${API_BASE_URL}/forum-posts`);
};

export const getForumPost = (id: string) => {
  return axios.get(`${API_BASE_URL}/forum-posts/${id}`);
};

export const createForumPost = (dto: CreateForumPostDto) => {
  return axios.post(`${API_BASE_URL}/forum-posts`, dto);
};

export const updateForumPost = (id: string, dto: UpdateForumPostDto) => {
  return axios.put(`${API_BASE_URL}/forum-posts/${id}`, dto);
};

export const deleteForumPost = (id: string) => {
  return axios.delete(`${API_BASE_URL}/forum-posts/${id}`);
};
