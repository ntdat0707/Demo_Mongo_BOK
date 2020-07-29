import { Injectable } from '@nestjs/common';
import { Dentist } from './dentist.entity';
import { DentistRepository } from './dentist.repository';

@Injectable()
export class DentistService {
    constructor(private dentistRepository:DentistRepository){}
}
