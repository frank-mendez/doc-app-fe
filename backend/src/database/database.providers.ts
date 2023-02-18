import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => {
      console.log('process.env.MONGODB_URL', process.env.MONGODB_URL);
      const connection = mongoose.connect(process.env.MONGODB_URL);
      connection.then((result) => {
        console.log('result', result);
      });
      return connection;
    },
  },
];
