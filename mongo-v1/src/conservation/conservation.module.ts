import { Module } from '@nestjs/common';
import { ConservationService } from './conservation.service';
import { ConservationRepository } from './conservation.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([ConservationRepository])],
  providers: [ConservationService]
})
export class ConservationModule {}
