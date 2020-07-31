import { Test, TestingModule } from '@nestjs/testing';
import { BotBookingService } from './botbooking.service';

describe('BotbookingService', () => {
  let service: BotBookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BotBookingService],
    }).compile();

    service = module.get<BotBookingService>(BotBookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
