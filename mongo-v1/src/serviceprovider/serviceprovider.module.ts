import { Module } from '@nestjs/common';
import { ServiceproviderService } from './serviceprovider.service';

@Module({
  providers: [ServiceproviderService]
})
export class ServiceproviderModule {}
