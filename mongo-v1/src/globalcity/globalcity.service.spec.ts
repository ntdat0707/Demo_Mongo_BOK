import { Test, TestingModule } from '@nestjs/testing';
import { GlobalCityService } from './globalcity.service';

describe('GlobalcityService', () => {
  let service: GlobalCityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalCityService],
    }).compile();

    service = module.get<GlobalCityService>(GlobalCityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
