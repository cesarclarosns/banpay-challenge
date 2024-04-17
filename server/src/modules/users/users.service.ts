import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { FindAllQueryParametersDto } from '@/common/dto/find-all-query-parameters.dto';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectPinoLogger(UsersService.name) private readonly logger: PinoLogger,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const document = await this.userModel.create(createUserDto);
    const user = new UserDto(document.toJSON());
    return user;
  }

  async findAll({
    skip,
    limit,
  }: FindAllQueryParametersDto): Promise<UserDto[]> {
    const documents = await this.userModel.find(
      {},
      {},
      { limit: +limit, skip: +skip, sort: { _id: 1 } },
    );
    const users = documents.map((document) => new UserDto(document.toJSON()));
    return users;
  }

  async findOneById(id: string): Promise<UserDto | null> {
    const document = await this.userModel.findById(id);
    if (!document) return null;
    const user = new UserDto(document.toJSON());
    return user;
  }

  async findOneByEmail(email: string): Promise<UserDto | null> {
    const document = await this.userModel.findOne({ email });
    if (!document) return null;
    const user = new UserDto(document.toJSON());
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto | null> {
    const document = await this.userModel.findOneAndUpdate(
      { _id: id },
      { $set: updateUserDto },
      { new: true },
    );
    if (!document) return null;
    const user = new UserDto(document.toJSON());
    return user;
  }

  async remove(id: string): Promise<UserDto | null> {
    const document = await this.userModel.findOneAndDelete({ _id: id });
    if (!document) return null;
    return new UserDto(document.toJSON());
  }

  async updateRole(
    id: string,
    updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<UserDto | null> {
    const document = await this.userModel.findOneAndUpdate(
      { _id: id },
      { $set: updateUserRoleDto },
      { new: true },
    );
    if (!document) return null;
    return new UserDto(document.toJSON());
  }
}
