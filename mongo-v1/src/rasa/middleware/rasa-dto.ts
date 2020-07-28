import { IsNotEmpty } from 'class-validator';

export class RasaDTO {
    @IsNotEmpty()
    message_rasa: { message: string[]; state: string; data: string[] };
}