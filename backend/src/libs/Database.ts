import * as mongoose from "mongoose";
import seedData from "./seedData";

export class Database {
  public static open = async (mongoUrl : string) => {
    try {
      return new Promise<void>((resolve, reject) => {
        const options = {
          autoIndex: false,
          minPoolSize: 5,
        };
        mongoose.connect(mongoUrl, options);
        mongoose.connection.on('error', () => {
          console.log('Database is not connected :');
          reject();
        });
        mongoose.connection.on('connected', async () => {
          console.log('\nDatabase connect successfully');
          await seedData();
          resolve();
        });
      });
    } catch (error) {
      console.log('CATCH BLOCK : database open =>', error);
    }
  }

  public static disconnect = async () => {
    try {
      await mongoose.disconnect();
    } catch (error) {
      console.log('CATCH BLOCK : database disconnect =>', error);
    }
  };
}
