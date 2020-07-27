import { IsNotEmpty } from 'class-validator';

export class ReplyFEDTO {
    @IsNotEmpty()
    send_reply: { state: string, data: object };
}
