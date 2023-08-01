export interface UserDto {
  _id: string;
  username: string;
  elo: number;
  password: string;
}

export interface CreateUserDto {
  username: string;
  password: string;
}

export interface UpdateUserDto extends Partial<CreateUserDto> {}
