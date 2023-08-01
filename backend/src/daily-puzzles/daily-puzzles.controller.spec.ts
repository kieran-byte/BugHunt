import { Test, TestingModule } from '@nestjs/testing';
import { DailyPuzzlesController } from './daily-puzzles.controller';
import { DailyPuzzlesService } from './daily-puzzles.service';

describe('DailyPuzzlesController', () => {
  let controller: DailyPuzzlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyPuzzlesController],
      providers: [DailyPuzzlesService],
    }).compile();

    controller = module.get<DailyPuzzlesController>(DailyPuzzlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
