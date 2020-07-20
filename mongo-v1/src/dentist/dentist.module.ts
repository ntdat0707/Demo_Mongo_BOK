import { Module } from '@nestjs/common';
import { DentistService } from './dentist.service';

@Module({
  providers: [DentistService]
})
export class DentistModule {}
