import { Controller, Post } from '@nestjs/common';
@Controller('chatbot')
export class ChatbotController {
  constructor() {}

  //Demo connect - get request --- response
  // @Post()
  // async getReply() {
  //   const token_access =
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QgMiIsImlhdCI6MTU5NTgxODY3MiwiZXhwIjoxNTk1ODIyMjcyfQ.YptTb1FYHYfPOu5pX7mm4VNCabiBjWAePxEoykz1NEc';
  //   //get token  -- return user details
  //   const axios = require('axios').create({
  //     baseURL: 'http://localhost:3000',
  //     headers: {
  //       Authorization: `Bearer ${token_access}`,
  //     },
  //   });
  //   axios
  //     .post('/customer/logged')
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

}
