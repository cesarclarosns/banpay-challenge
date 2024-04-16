import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import argon2 from 'argon2';
import { Model } from 'mongoose';
import { DataFactory, Seeder } from 'nestjs-seeder';

import { User } from '@/modules/users/entities/user.entity';

import { UserRole } from './types/user-role';

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async seed(): Promise<any> {
    const hashedPassword = await argon2.hash('password');

    await this.userModel.insertMany(
      DataFactory.createForClass(User).generate(1, {
        email: 'admin@admin.com',
        hashedPassword,
        name: 'admin',
        role: 'admin' satisfies UserRole,
      }),
    );

    await this.userModel.insertMany(
      DataFactory.createForClass(User).generate(20, {
        gender: 'male',
        hashedPassword,
        role: 'films' satisfies UserRole,
      }),
    );
  }

  async drop(): Promise<any> {
    return await this.userModel.deleteMany({});
  }
}
