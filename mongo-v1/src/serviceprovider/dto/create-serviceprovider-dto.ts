import { IsNotEmpty } from "class-validator";

export class CreateServiceProviderDTO{
    @IsNotEmpty()
    provider_name: string;

    @IsNotEmpty()
    provider_products: string;

    @IsNotEmpty()
    provider_dentists: string;

    @IsNotEmpty()
    provider_location:string;
}