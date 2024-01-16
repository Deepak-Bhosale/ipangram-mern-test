import { VersionableSchema } from "../versionable/VersionableSchema";

export class DepartmentSchema extends VersionableSchema {
  constructor(collections: any) {
    const usedepartmentSchema = Object.assign({
      name: {
        type: String,
        required: true,
      },
      managerId: {
        type: String,
        required: false,
      },
    });
    super(usedepartmentSchema, collections);
  }
}
