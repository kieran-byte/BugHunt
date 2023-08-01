import { Test, TestingModule } from '@nestjs/testing';
import { DailyPuzzlesService } from './daily-puzzles.service';

describe('DailyPuzzlesService', () => {
  let service: DailyPuzzlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyPuzzlesService],
    }).compile();

    service = module.get<DailyPuzzlesService>(DailyPuzzlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
