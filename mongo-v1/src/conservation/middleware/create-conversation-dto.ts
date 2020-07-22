import { IsNotEmpty, IsDateString } from "class-validator";

export class CreateConversationDTO {
    @IsNotEmpty()
    conservation_id:number;

    // @IsDateString()
    // timestamp = new Date();
}