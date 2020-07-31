import { Test, TestingModule } from '@nestjs/testing';
import { GlobalCityController } from './globalcity.controller';

describe('GlobalCity Controller', () => {
  let controller: GlobalCityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlobalCityController],
    }).compile();

    controller = module.get<GlobalCityController>(GlobalCityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
