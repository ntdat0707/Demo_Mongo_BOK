import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReplyFEDTO {
    @ApiProperty()
    @IsNotEmpty()
    reply_fe: { state: string, data: any };
}
