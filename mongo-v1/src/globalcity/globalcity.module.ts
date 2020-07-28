import { Module } from '@nestjs/common';
import { GlobalCityService } from './globalcity.service';
import { GlobalCityController } from './globalcity.controller';
import { GlobalCityRepository } from './globalcity.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([GlobalCityRepository])],
  providers: [GlobalCityService],
  controllers: [GlobalCityController],
  exports:[GlobalCityService]
})
export class GlobalCityModule {}
