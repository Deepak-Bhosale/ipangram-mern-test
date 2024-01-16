import IVersionableDocuments from "../versionable/IVersionableDocument";

export interface IDepartmentModel extends IVersionableDocuments {
  name: string;
  managerId: string;
}
