import { Type } from '@nestjs/common';
import { MessageFEDTO } from 'src/botbooking/middleware/getmessage-fe-dto';

export interface IState {
  getMessage: (data: MessageFEDTO) => string;
  excute: (data: MessageFEDTO) => void;
  getDataReply: (data: MessageFEDTO) => any;
}
