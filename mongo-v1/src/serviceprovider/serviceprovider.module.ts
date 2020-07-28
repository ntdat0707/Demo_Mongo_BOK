import { Module } from '@nestjs/common';
import { ServiceproviderService } from './serviceprovider.service';
import { ServiceproviderController } from './serviceprovider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceProviderRepository } from './serviceprovider.repository';

@Module({
  imports:[TypeOrmModule.forFeature([ServiceProviderRepository])],
  providers: [ServiceproviderService],
  controllers: [ServiceproviderController],
  exports:[ServiceproviderService]
})
export class ServiceproviderModule {}
