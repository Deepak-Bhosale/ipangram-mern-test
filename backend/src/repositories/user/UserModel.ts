import * as mongoose from 'mongoose';
import { UserSchema } from './UserSchema';
import { IUserModel } from './IUserModel';

export const userSchema = new UserSchema({
  collections: 'users',
  versionKey: false,
});

export const userModel: mongoose.Model<IUserModel> = mongoose.model<IUserModel>(
  'users',
  userSchema
);

userModel.collection.createIndex({ email: 1 });
