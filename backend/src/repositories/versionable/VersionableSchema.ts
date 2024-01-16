import * as mongoose from "mongoose";

export class VersionableSchema extends mongoose.Schema {
  constructor(options: any, collections: mongoose.SchemaOptions ) {
    const versionSchema = Object.assign({
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      deletedAt: {
        type: Date,
        default: null,
      },
      originalId: {
        type: String,
        required: true,
      },
    },options);
    super(versionSchema, collections);
  }
}
