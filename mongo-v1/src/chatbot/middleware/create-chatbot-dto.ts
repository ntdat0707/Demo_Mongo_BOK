import { IsNotEmpty, IsOptional, IsIn } from "class-validator";
import { Language } from "../chatbot.entity";

export class CreateChatbotDTO {
    @IsNotEmpty()
    channel_id: string;
  
    @IsNotEmpty()
    message: string;
  
    @IsOptional()
    response: string;

    @IsNotEmpty()
    @IsIn([Language.en,Language.vn])
    type:Language;
  }
  