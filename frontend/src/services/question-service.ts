import axios from 'axios';
import { CreateQuestionDto, UpdateQuestionDto } from './dto/question.dto';

const API_BASE_URL = process.env.API_BASE_URL;

export const QuestionService = {
  async createQuestion(createQuestionDto: CreateQuestionDto) {
    return axios.post(`${API_BASE_URL}/questions`, createQuestionDto);
  },

  async findAllQuestions() {
    return axios.get(`${API_BASE_URL}/questions`);
  },

  async findQuestionById(id: string) {
    return axios.get(`${API_BASE_URL}/questions/${id}`);
  },

  async updateQuestion(id: string, updateQuestionDto: UpdateQuestionDto) {
    return axios.put(`${API_BASE_URL}/questions/${id}`, updateQuestionDto);
  },

  async deleteQuestion(id: string) {
    return axios.delete(`${API_BASE_URL}/questions/${id}`);
  },
};
