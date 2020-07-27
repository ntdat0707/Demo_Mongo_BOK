import { Test, TestingModule } from '@nestjs/testing';
import { GlobalcityController } from './globalcity.controller';

describe('Globalcity Controller', () => {
  let controller: GlobalcityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlobalcityController],
    }).compile();

    controller = module.get<GlobalcityController>(GlobalcityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
