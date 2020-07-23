import { IsNotEmpty, IsDateString, ValidateNested } from "class-validator";
import { CreateCustomerDTO } from "src/customer/middleware/create-customer-dto";

export class CreateConversationDTO {
    @IsNotEmpty()
    conservation_id:number;

    @IsNotEmpty()
    conversation: {content:string, user:CreateCustomerDTO};
    // @IsDateString()
    // timestamp = new Date();
}