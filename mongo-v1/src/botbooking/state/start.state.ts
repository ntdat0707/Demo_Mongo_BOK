import { Injectable } from '@nestjs/common';
import { State } from './class/state.class';
import { MessageFEDTO } from '../middleware/getmessage-fe-dto';

export class StateStart extends State {
  constructor() {
    super();
    this.name = "start";
    this.hashMessage = "hello rasa";
  }

  async getDataRely(requestFE: MessageFEDTO) {
    if (requestFE.message) {
      let token = requestFE.message;
      return await this.getUserLoggedInfo(token);
    }
    return [];
  }
  
  async getUserLoggedInfo(token: string): Promise<any> {
    const token_access = token;
    const axios = require('axios').create({
      baseURL: 'http://localhost:3000',
      headers: {
        Authorization: `Bearer ${token_access}`,
      },
    });

    return await axios.post('/customer/logged')
      .then((response: any) => {
        console.log('User Logged', response.data);
        return response.data;
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

}
