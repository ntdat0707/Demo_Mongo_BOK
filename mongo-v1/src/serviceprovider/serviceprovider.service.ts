import { Injectable } from '@nestjs/common';
import { ServiceProviderRepository } from './serviceprovider.repository';
import { CreateServiceProviderDTO } from './middleware/create-serviceprovider-dto';
import { ServiceProvider } from './serviceprovider.entity';

@Injectable()
export class ServiceproviderService {
    constructor(private serviceproviderRepositorys: ServiceProviderRepository) {}
    async createSP(serviceproviderDTO:CreateServiceProviderDTO):Promise<ServiceProvider>{
        return this.serviceproviderRepositorys.createProvider(serviceproviderDTO);
    }
}
