import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReplyFEDTO {
    @ApiProperty({type:Object})
    @IsNotEmpty()
    reply_fe: { state: string, data: any };
}
