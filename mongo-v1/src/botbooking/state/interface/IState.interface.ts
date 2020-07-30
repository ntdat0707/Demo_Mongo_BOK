import {Type} from "@nestjs/common";

export interface IState{
  getMessage: (data: any) => string;
  excute: (data: any) => void;
  getDataRely: (data: any) => any;

}
