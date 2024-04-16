import { MongooseModule } from '@nestjs/mongoose';
import { seeder } from 'nestjs-seeder';

import { settings } from './config/settings';
import { User, UserSchema } from './modules/users/entities/user.entity';
import { UsersSeeder } from './modules/users/users.seeder';

seeder({
  imports: [
    MongooseModule.forRoot(settings.DATABASE.MONGODB_URI),
    MongooseModule.forFeature([
      // Users
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
}).run([UsersSeeder]);
