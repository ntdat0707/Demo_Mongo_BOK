import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ServiceproviderService } from './serviceprovider.service';
import { CreateServiceProviderDTO } from './middleware/create-serviceprovider-dto';
import { ServiceProvider } from './serviceprovider.entity';

@Controller('sp')
export class ServiceproviderController {
    constructor(private ServiceProviderService: ServiceproviderService) {}
    
    @Post()
   // @UsePipes(ValidationPipe)
    async createSP (@Body(ValidationPipe) serviceproviderDTO:CreateServiceProviderDTO):Promise<ServiceProvider>{
        return this.ServiceProviderService.createSP(serviceproviderDTO);
    }
}
