import { Module } from '@nestjs/common';
import { DentistService } from './dentist.service';

@Module({
  providers: [DentistService],
  exports:[DentistService]
})
export class DentistModule {}
