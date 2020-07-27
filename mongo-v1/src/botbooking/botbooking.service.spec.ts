import { Test, TestingModule } from '@nestjs/testing';
import { BotbookingService } from './botbooking.service';

describe('BotbookingService', () => {
  let service: BotbookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BotbookingService],
    }).compile();

    service = module.get<BotbookingService>(BotbookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
