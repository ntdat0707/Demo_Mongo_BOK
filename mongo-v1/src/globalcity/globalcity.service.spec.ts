import { Test, TestingModule } from '@nestjs/testing';
import { GlobalcityService } from './globalcity.service';

describe('GlobalcityService', () => {
  let service: GlobalcityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalcityService],
    }).compile();

    service = module.get<GlobalcityService>(GlobalcityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
