import * as mongoose from 'mongoose';

export default interface IVersionableDocuments extends mongoose.Document{
  createdAt: Date;
  deletedAt: Date;
  originalId: string;
}
