import { Module } from '@nestjs/common';
import { ConservationService } from './conservation.service';
import { ConservationRepository } from './conservation.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConservationController } from './conservation.controller';

@Module({
  imports:[TypeOrmModule.forFeature([ConservationRepository])],
  providers: [ConservationService],
  controllers: [ConservationController]
})
export class ConservationModule {}
