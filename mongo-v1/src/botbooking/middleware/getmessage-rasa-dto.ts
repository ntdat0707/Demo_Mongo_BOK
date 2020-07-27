import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class MessageRasaDTO {
  @IsNotEmpty()
  message: { message: string[]; state: string; data: object };
}
