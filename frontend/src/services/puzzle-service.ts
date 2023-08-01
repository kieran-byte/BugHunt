import axios from "axios";
import { PuzzleDto } from "./dto/puzzle.dto";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getPuzzles = () => {
  return axios.get(`${API_BASE_URL}/puzzles`);
};

export const getPuzzle = async (id: string) => {
  const data = await axios.get(`${API_BASE_URL}/puzzles/${id}`);
  return data.data;
};

export const getPuzzleByTopicAndTask = async (topic: string, task: string) => {
  const data = await axios.get(`${API_BASE_URL}/puzzles/${topic}/${task}`);
  return data.data;
};

export const findByTopicAndIsCurriculum = async (topic: string) => {
  const data = await axios.get(`${API_BASE_URL}/puzzles/topic/${topic}`);
  return data.data;
};

export const getCurriculumPuzzleByTopicAndTask = async (
  topic: string,
  task: string
) => {
  const data = await axios.get(
    `${API_BASE_URL}/puzzles/${topic}/${task}/curriculum`
  );
  return data.data;
};

export const getCustomPuzzles = async () => {
  const data = await axios.get(`${API_BASE_URL}/puzzles/custom`);
  return data.data;
};

export const createPuzzle = (dto: PuzzleDto) => {
  return axios.post(`${API_BASE_URL}/puzzles`, dto);
};

export const updatePuzzle = (id: string, dto: PuzzleDto) => {
  return axios.put(`${API_BASE_URL}/puzzles/${id}`, dto);
};

export const deletePuzzle = (id: string) => {
  return axios.delete(`${API_BASE_URL}/puzzles/${id}`);
};
