import { IsOptional, IsIn, IsNotEmpty } from "class-validator";
import { Language } from "../chatbot.entity";


export class GetChatbotFilterDTO{
    @IsOptional()
    @IsIn([Language.en,Language.vn])
    language:string;
}