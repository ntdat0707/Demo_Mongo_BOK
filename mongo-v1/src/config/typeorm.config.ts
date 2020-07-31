

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

//config connection string with Mongodb
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: 'mongodb+srv://Test1:123@cluster0-ga0wm.azure.mongodb.net/Wesere_Test',
  synchronize: true,
  useUnifiedTopology: true,
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // note focus on this line when error repo cannot access to entity
};
