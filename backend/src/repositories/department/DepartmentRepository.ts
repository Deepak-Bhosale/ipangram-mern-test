import * as mongoose from 'mongoose';
import { departmentModel } from './DepartmentModel';
import { IDepartmentModel } from './IDepartmentModel';
import VersionableRepository from '../versionable/VersionableRepository';

class DepartmentRepository extends VersionableRepository<
  any,
  mongoose.Model<IDepartmentModel>
> {
  constructor(model: any) {
    super(model);
  }

  public async countDepartments(query = {}) {
    try {
      return await super.count(query);
    } catch (error) {
      console.log(
        'CATCH BLOCK : Department Repository countDepartments =>',
        error
      );
    }
  }

  public async getAllDepartment(
    options?: mongoose.QueryOptions,
    projection?: { password: number }
  ): Promise<mongoose.Query<IDepartmentModel[], IDepartmentModel>> {
    try {
      return await super.getAll(options, projection);
    } catch (error) {
      console.log(
        'CATCH BLOCK : Department Repository getAllDepartments =>',
        error
      );
    }
  }

  public async findOneDepartment(
    query: mongoose.FilterQuery<IDepartmentModel>,
    projection?
  ): Promise<mongoose.Query<IDepartmentModel, IDepartmentModel>> {
    try {
      return await super.findOne(query, projection);
    } catch (error) {
      console.log(
        'CATCH BLOCK : Department Repository findOneDepartment =>',
        error
      );
    }
  }

  public async findDepartments(
    query: mongoose.FilterQuery<IDepartmentModel>,
    projection?: any,
    option?: mongoose.QueryOptions
  ): Promise<IDepartmentModel[]> {
    try {
      return await super.find(query, projection, option);
    } catch (error) {
      console.log(
        'CATCH BLOCK : Department Repository findDepartments =>',
        error
      );
    }
  }

  public async createDepartment(
    data: any,
    projection: any
  ): Promise<IDepartmentModel[]> {
    try {
      return await super.create(data, projection);
    } catch (error) {
      console.log(
        'CATCH BLOCK : Department Repository createDepartment =>',
        error
      );
    }
  }

  public async updateDepartment(
    query: mongoose.FilterQuery<any>,
    data: mongoose.FilterQuery<IDepartmentModel[]>,
    projection: any
  ) {
    try {
      return await super.update(query, data, projection);
    } catch (error) {
      console.log('CATCH BLOCK : Department Repository update =>', error);
    }
  }

  public async deleteDepartment(query: mongoose.FilterQuery<IDepartmentModel>) {
    try {
      return await super.delete(query);
    } catch (error) {
      console.log('CATCH BLOCK : Department Repository delete =>', error);
    }
  }
}

export const departmentRepository = new DepartmentRepository(departmentModel);
