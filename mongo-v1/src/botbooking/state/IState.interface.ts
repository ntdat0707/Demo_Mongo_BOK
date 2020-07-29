import {Type} from "@nestjs/common";
import {ReplyDTO} from "../middleware/sendreply-fe-dto";

export interface IState{
  getMessage: (data: any) => string;
  excute: (data: any) => void;
  getRely: (data: any) => ReplyDTO;

}
