import { Test, TestingModule } from '@nestjs/testing';
import { BotbookingController } from './botbooking.controller';

describe('Botbooking Controller', () => {
  let controller: BotbookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BotbookingController],
    }).compile();

    controller = module.get<BotbookingController>(BotbookingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
