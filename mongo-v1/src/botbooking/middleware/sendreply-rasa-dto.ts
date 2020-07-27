import { IsNotEmpty } from 'class-validator';

export class ReplyRasaDTO {
  @IsNotEmpty()
  reply: { message: string};
}
