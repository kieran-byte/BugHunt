import axios from 'axios';
import { CreateGameDto, UpdateGameDto } from './dto/game.dto';

const API_BASE_URL = process.env.API_BASE_URL;

export const getGames = () => {
  return axios.get(`${API_BASE_URL}/games`);
};

export const getGame = (id: string) => {
  return axios.get(`${API_BASE_URL}/games/${id}`);
};

export const createGame = (dto: CreateGameDto) => {
  return axios.post(`${API_BASE_URL}/games`, dto);
};

export const updateGame = (id: string, dto: UpdateGameDto) => {
  return axios.put(`${API_BASE_URL}/games/${id}`, dto);
};

export const deleteGame = (id: string) => {
  return axios.delete(`${API_BASE_URL}/games/${id}`);
};
