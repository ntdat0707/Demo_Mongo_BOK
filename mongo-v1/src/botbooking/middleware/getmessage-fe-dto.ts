import { IsNotEmpty } from 'class-validator';

export class MessageFEDTO {
    @IsNotEmpty()
    message: { state: string, data: object };
}
