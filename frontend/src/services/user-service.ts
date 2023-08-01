import axios from "axios";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createUser = (createUserDto: CreateUserDto) => {
  return axios.post(`${API_BASE_URL}/users`, createUserDto);
};

export const findAllUsers = () => {
  return axios.get(`${API_BASE_URL}/users`);
};

export const findUserById = (id: string) => {
  return axios.get(`${API_BASE_URL}/users/${id}`);
};

export const updateUser = (id: string, updateUserDto: UpdateUserDto) => {
  return axios.patch(`${API_BASE_URL}/users/${id}`, updateUserDto);
};

export const removeUser = (id: string) => {
  return axios.delete(`${API_BASE_URL}/users/${id}`);
};
