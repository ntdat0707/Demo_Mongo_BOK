import { GlobalCity } from './globalcity.entity';
import { EntityRepository, Repository } from 'typeorm';
import { GlobalCityDTO } from './middleware/globalcity-dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(GlobalCity)
export class GlobalCityRepository extends Repository<GlobalCity> {
  async createCity(globalcityDTO: GlobalCityDTO): Promise<GlobalCity> {
    const { city_id, name } = globalcityDTO;
    const city = new GlobalCity();
    city.city_id = city_id;
    city.name = name;
    try {
      await city.save();
      return city;
    } catch (err) {
      throw new InternalServerErrorException('Can not create this city');
    }
  }

}
