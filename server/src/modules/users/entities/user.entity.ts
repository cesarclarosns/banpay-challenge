import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Factory } from 'nestjs-seeder';

import { UserRole } from '../types/user-role';

@Schema({
  collection: 'user',
  strict: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      return ret;
    },
  },
  versionKey: false,
})
export class User extends Document {
  @Factory((faker, ctx) => {
    if (ctx?.name) return ctx.name;
    return faker!.person.fullName({ sex: ctx!.gender });
  })
  @Prop({ required: true, type: String })
  name: string;

  @Factory((faker, ctx) => {
    if (ctx?.email) return ctx.email;
    return faker!.internet.email({ firstName: ctx!.name });
  })
  @Prop({ required: true, type: String })
  email: string;

  @Factory((faker, ctx) => ctx!.hashedPassword)
  @Prop({ required: true, type: String })
  hashedPassword: string;

  @Factory((faker, ctx) => ctx!.role)
  @Prop({
    enum: [
      'admin',
      'films',
      'locations',
      'people',
      'species',
      'vehicles',
    ] satisfies UserRole[],
    required: true,
    type: String,
  })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1 }, { unique: true });
