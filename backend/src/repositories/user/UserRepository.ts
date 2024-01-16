import * as mongoose from "mongoose";
import { userModel } from "./UserModel";
import { IUserModel } from "./IUserModel";
import VersionableRepository from "../versionable/VersionableRepository";

class UserRepository extends VersionableRepository<
  any,
  mongoose.Model<IUserModel>
> {
  constructor(model: any) {
    super(model);
  }

  public async countUsers(query = {}) {
    try {
      return await super.count(query);
    } catch (error) {
      console.log("CATCH BLOCK : User Repository countUsers =>", error);
    }
  }

  public async getAllUser(
    options?: mongoose.QueryOptions,
    projection?: { password: number }
  ): Promise<mongoose.Query<IUserModel[], IUserModel>> {
    try {
      return await super.getAll(options, projection);
    } catch (error) {
      console.log("CATCH BLOCK : User Repository getAllUsers =>", error);
    }
  }

  public async findOneUser(
    query: mongoose.FilterQuery<IUserModel>,
    projection?
  ): Promise<mongoose.Query<IUserModel, IUserModel>> {
    try {
      return await super.findOne(query, projection);
    } catch (error) {
      console.log("CATCH BLOCK : User Repository findOneUser =>", error);
    }
  }

  public async findUsers(
    query: mongoose.FilterQuery<IUserModel>,
    projection?: any,
    option?: mongoose.QueryOptions
  ): Promise<IUserModel[]> {
    try {
      return await super.find(query, projection, option);
    } catch (error) {
      console.log("CATCH BLOCK : User Repository findUsers =>", error);
    }
  }

  public async createUser(data: any, projection: any): Promise<IUserModel[]> {
    try {
      return await super.create(data, projection);
    } catch (error) {
      console.log("CATCH BLOCK : User Repository createUser =>", error);
    }
  }

  public async updateUser(
    query: mongoose.FilterQuery<any>,
    data: mongoose.FilterQuery<IUserModel[]>,
    projection: any
  ) {
    try {
      return await super.update(query, data, projection);
    } catch (error) {
      console.log("CATCH BLOCK : User Repository update =>", error);
    }
  }

  public async deleteUser(query: mongoose.FilterQuery<IUserModel>) {
    try {
      return await super.delete(query);
    } catch (error) {
      console.log("CATCH BLOCK : User Repository delete =>", error);
    }
  }
}

export const userRepository = new UserRepository(userModel);
