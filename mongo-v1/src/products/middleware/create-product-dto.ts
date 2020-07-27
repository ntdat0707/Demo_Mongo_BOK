import { IsNotEmpty } from "class-validator";

export class CreateProductDTO {
    @IsNotEmpty()
    product_id:number;
    
    @IsNotEmpty()
    product_kind:string;

    @IsNotEmpty()
    product_price_quote:[{name:string,price:number,quantum:string}];

    // @IsNotEmpty()
    // product_price:number;
}