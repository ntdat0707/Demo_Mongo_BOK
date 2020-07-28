import { IsNotEmpty } from 'class-validator';

export class ReplyFEDTO {
    @IsNotEmpty()
    reply_fe: { state: string, data: any };
}
