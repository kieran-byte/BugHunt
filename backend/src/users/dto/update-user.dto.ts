import { PartialType } from '@nestjs/mapped-types';
import { User } from '../shemas/user.schema';

export class UpdateUserDto extends PartialType(User) {}
