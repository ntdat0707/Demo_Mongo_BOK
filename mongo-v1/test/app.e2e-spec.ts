import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { MessageFEDTO } from 'src/botbooking/middleware/getmessage-fe-dto';

describe('AppController (e2e)', () => {
  const app = 'http://localhost:3000';

  describe('Test Start', () => {
    it('should request', () => {
      const requestFE: MessageFEDTO = {
        sender: '0',
        state: 'start',
        message: '',
        data: '',
      };

      return request(app)
        .post('/botbooking')
        .expect(201)
        .send(requestFE)
        .expect({
          message: [
            'Wellcome to Elite Dental',
            'We provide diagnostics, dental care, general, and specialized treatment...',
            'do you want to use the following information to make an appointment?',
          ],
          state: 'follow_information',
          data: [],
        });
    });
  });

  describe('Test follow_information', () => {
    it('should request', () => {
      const requestFE: MessageFEDTO = {
        sender: '0',
        state: 'follow_information',
        message: "That's great",
        data: '',
      };

      return request(app)
        .post('/botbooking')
        .expect(201)
        .send(requestFE)
        .expect({
          message: ['Select your location'],
          state: 'select_location',
          data: [
            {
              _id: '5f1e8deed8025d378c24e7fc',
              city_id: 1,
              name: 'Ho Chi Minh City',
            },
            {
              _id: '5f1e8e00d8025d378c24e7fd',
              city_id: 2,
              name: 'Ha Noi City',
            },
            {
              _id: '5f1e8e07d8025d378c24e7fe',
              city_id: 3,
              name: 'Da Nang City',
            },
          ],
        });
    });
  });

  describe('Test select_locaiton', () => {
    it('should request', () => {
      const requestFE: MessageFEDTO = {
        sender: '0',
        state: 'select_location',
        message: 'Ha Noi City',
        data: '',
      };

      return request(app)
        .post('/botbooking')
        .expect(201)
        .send(requestFE)
        .expect({
          message: ['Those are the nearest branches that we found for you.'],
          state: 'nearest_branch',
          data: [
            {
              address: '202 Duong Lang, Ha Noi',
            },
            {
              address: '72 Do Chieu, Ha Noi',
            },
            {
              address: '505 Pho Co, Ha Noi',
            },
            {
              address: '609 Quang Trung, Ha Noi',
            },
          ],
        });
    });
  });

  describe('Test nearest_branch', () => {
    it('should request', () => {
      const requestFE: MessageFEDTO = {
        sender: '0',
        state: 'nearest_branch',
        message: '',
        data: '',
      };

      return request(app)
        .post('/botbooking')
        .expect(201)
        .send(requestFE)
        .expect({
          message: [
            'Thanks you! What kind of service are you looking for... ?',
          ],
          state: 'select_service',
          data: ['Whitening', 'Checks-up', 'Braces', 'Implant', 'Fillings'],
        });
    });
  });

  describe('Test service', () => {
    it('should request service', () => {
      const requestFE: MessageFEDTO = {
        sender: '0',
        state: 'select_service',
        message: 'Braces',
        data: '',
      };

      return request(app)
        .post('/botbooking')
        .expect(201)
        .send(requestFE)
        .expect({
          message: [
            'Which doctor do you want?',
            'Choose no refernce to get the maxium availiability',
          ],
          state: 'select_doctor',
          data: [
            {
              product_id: 4,
              product_kind: 'Braces',
              product_price_quote: [
                {
                  name: 'Braces - 1',
                  price: '14000000',
                  quantum: '1 screw',
                },
                {
                  name: 'Braces - 2',
                  price: '7000000',
                  quantum: '1 screw',
                },
                {
                  name: 'Braces - 3',
                  price: '28000000',
                  quantum: '1 screw',
                },
                {
                  name: 'Braces - 4',
                  price: '8000000',
                  quantum: '1 screw',
                },
              ],
            },
          ],
        });
    });
  });

  describe('Test service', () => {
    it('should request doctor', () => {
      const requestFE: MessageFEDTO = {
        sender: '0',
        state: 'select_doctor',
        message: '',
        data: '',
      };

      return request(app)
        .post('/botbooking')
        .expect(201)
        .send(requestFE)
        .expect({
          message: ['Perfect', 'Which date would you like to book?'],
          state: 'date_booking',
          data: [
            {
              dentist_id: 1,
              dentist_name: 'dentist_1',
              dentist_email: 'xxx@gmail.com',
              dentist_phone: '1111',
            },
            {
              dentist_id: 2,
              dentist_name: 'dentist_2',
              dentist_email: 'xxx@gmail.com',
              dentist_phone: '22222',
            },
            {
              dentist_id: 3,
              dentist_name: 'dentist_33333',
              dentist_email: 'xxx@gmail.com',
              dentist_phone: '33333',
            },
            {
              dentist_id: 4,
              dentist_name: 'dentist_4',
              dentist_email: 'xxx@gmail.com',
              dentist_phone: '4',
            },
            {
              dentist_id: 5,
              dentist_name: 'dentist_5',
              dentist_email: 'xxx@gmail.com',
              dentist_phone: '55555',
            },
            {
              dentist_id: 6,
              dentist_name: 'dentist_6',
              dentist_email: 'xxx@gmail.com',
              dentist_phone: '666666',
            },
          ],
        });
    });
  });
});
