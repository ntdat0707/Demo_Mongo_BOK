import { IsNotEmpty } from 'class-validator';

export class ReplyDTO {
    @IsNotEmpty()
    state: string;
    
    @IsNotEmpty()
    message: string[];
    
    @IsNotEmpty()
    data: any;
}
