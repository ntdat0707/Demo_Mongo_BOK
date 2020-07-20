import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  //host: 'localhost',
  url:
    'mongodb+srv://Test1:123@cluster0-ga0wm.azure.mongodb.net/Wesere_Test?retryWrites=true&w=majority',
  //url: process.env.MONGODB_CONNECTION_STRING,
  //database: process.env.MONGODB_DATABASE,
  //username: 'Test1',
  //password: '123',
  synchronize: true,
  useUnifiedTopology: true,
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // note focus on this line when error repo cannot access to entity
};
