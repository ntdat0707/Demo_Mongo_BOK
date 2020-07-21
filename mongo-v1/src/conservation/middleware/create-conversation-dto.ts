import { IsNotEmpty, IsDateString } from "class-validator";

export class CreateConversationDTO {
    @IsNotEmpty()
    conservation_id:string;

    @IsDateString()
    timestamp: Date;
}