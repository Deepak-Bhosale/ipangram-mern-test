import { VersionableSchema } from "../versionable/VersionableSchema";

export class UserSchema extends VersionableSchema {
  constructor(collections: any) {
    const userSchema = Object.assign({
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: false,
      },
      departmentId: {
        type: String,
        required: false,
      },
      role: {
        type: String,
        required: false,
      },
    });
    super(userSchema, collections);
  }
}
