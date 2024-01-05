import * as mongoose from 'mongoose';
import { DepartmentSchema } from './DepartmentSchema';
import { IDepartmentModel } from './IDepartmentModel';

export const departmentSchema = new DepartmentSchema({
  collections: 'department',
  versionKey: false,
});

export const departmentModel: mongoose.Model<IDepartmentModel> = mongoose.model<IDepartmentModel>(
  'department',
  departmentSchema
);

departmentModel.collection.createIndex({ name: 1 });
