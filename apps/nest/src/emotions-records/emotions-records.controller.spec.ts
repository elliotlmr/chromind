import { Test, TestingModule } from '@nestjs/testing';
import { EmotionsRecordsController } from './emotions-records.controller';

describe('EmotionsRecordsController', () => {
  let controller: EmotionsRecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmotionsRecordsController],
    }).compile();

    controller = module.get<EmotionsRecordsController>(
      EmotionsRecordsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
