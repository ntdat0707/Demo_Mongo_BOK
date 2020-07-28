import { Module } from '@nestjs/common';
import { DentistService } from './dentist.service';
import { DentistRepository } from './dentist.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DentistRepository])],
  providers: [DentistService],
  exports:[DentistService]
})
export class DentistModule {}
