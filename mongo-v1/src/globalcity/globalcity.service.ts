import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GlobalCity } from './globalcity.entity';
import { GlobalCityDTO } from './middleware/globalcity-dto';
import { GlobalCityRepository } from './globalcity.repository';

@Injectable()
export class GlobalCityService {
    constructor(private globalcityRepository:GlobalCityRepository){}
    async createCity(globalcityDTO:GlobalCityDTO): Promise<GlobalCity> {
      return this.globalcityRepository.createCity(globalcityDTO);
    }

    async getCities ():Promise<GlobalCity[]> {
        return this.globalcityRepository.find();
    }
}
