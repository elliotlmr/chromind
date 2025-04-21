import { Test, TestingModule } from '@nestjs/testing';
import { EmotionsRecordsService } from './emotions-records.service';

describe('EmotionsRecordsService', () => {
  let service: EmotionsRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmotionsRecordsService],
    }).compile();

    service = module.get<EmotionsRecordsService>(EmotionsRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
