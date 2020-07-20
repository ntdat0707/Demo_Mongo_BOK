import { IsNotEmpty } from "class-validator";

export class CreateProductDTO {
    @IsNotEmpty()
    product_kind:string;

    @IsNotEmpty()
    product_name:string;

    @IsNotEmpty()
    product_price:string;
}