import IVersionableDocuments from "../versionable/IVersionableDocument";

export interface IUserModel extends IVersionableDocuments {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: string;
  departmentId: string;
  role: string;
}
