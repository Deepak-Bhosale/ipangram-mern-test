import * as mongoose from "mongoose";

class VersionableRepository<
  A extends mongoose.Document,
  Y extends mongoose.Model<A>
> {
  private model: Y;
  constructor(model: Y) {
    this.model = model;
  }

  protected async create(data: any, projection?: any): Promise<any> {
    try {
      const id = new mongoose.Types.ObjectId();
      return new this.model(
        {
          originalId: data.originalId || id,
          createdAt: Date.now(),
          ...data,
          _id: id,
        },
        {
          _id: 0,
          password: 0,
          ...projection,
        }
      ).save();
    } catch (error) {
      console.log("CATCH BLOCK : Versionable repo create =>", error);
    }
  }

  protected async count(query: any) {
    try {
      return await this.model.countDocuments({ deletedAt: null, ...query });
    } catch (error) {
      console.log("CATCH BLOCK : Versionable repo count =>", error);
    }
  }

  protected async getAll(
    options?: mongoose.QueryOptions,
    projection?: any
  ): Promise<mongoose.Query<A[], A>> {
    try {
      const dynamicValues = Object.keys(options)[0];
      const searchResult = options.name || options.email;
      const fetchedData = {
        deletedAt: null,
        [dynamicValues]: { $regex: searchResult, $options: "i" },
      };
      return this.model.find(
        fetchedData,
        {
          _id: 0,
          deletedAt: 0,
          ...projection,
        },
        options
      );
    } catch (error) {
      console.log("CATCH BLOCK : Versionable repo getAll =>", error);
    }
  }

  public async find(
    query: mongoose.FilterQuery<A>,
    projection?: any,
    option?: any
  ): Promise<A[]> {
    try {
      return await this.model.find(
        { deletedAt: null, ...query },
        projection,
        option
      );
    } catch (error) {
      console.log("CATCH BLOCK : Versionable repo find =>", error);
    }
  }

  protected async findOne(
    query: any,
    projection?: any
  ): Promise<mongoose.Query<A, A>> {
    try {
      return await this.model.findOne(
        { deletedAt: null, ...query },
        projection,
        );
    } catch (error) {
      console.log("CATCH BLOCK : Versionable repo findOne =>", error);
    }
  }

  private softDelete = async (
    query: mongoose.FilterQuery<A>
  ): Promise<mongoose.UpdateQuery<A>> => {
    try {
      return await this.model
        .updateOne({ deletedAt: null, ...query }, { deletedAt: new Date() })
        .lean();
    } catch (error) {
      console.log("CATCH BLOCK : Versionable repo softDelete =>", error);
    }
  };

  protected async update(
    query: mongoose.FilterQuery<A>,
    data: mongoose.FilterQuery<A[]>,
    projection: any
  ): Promise<A[]> {
    try {
      await this.softDelete(query);
      return await this.create(data, projection);
    } catch (error) {
      console.log("CATCH BLOCK : Versionable repo update =>", error);
    }
  }

  protected async delete(
    query: mongoose.FilterQuery<A>
  ): Promise<mongoose.UpdateQuery<A>> {
    try {
      return await this.softDelete(query);
    } catch (error) {
      console.log("CATCH BLOCK : Versionable repo delete =>", error);
    }
  }
}

export default VersionableRepository;
