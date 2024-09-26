import { Test, TestingModule } from '@nestjs/testing';
import { CompanionsController } from './companions.controller';
import { CompanionsService } from './companions.service';

describe('CompanionsController', () => {
  let controller: CompanionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanionsController],
      providers: [CompanionsService],
    }).compile();

    controller = module.get<CompanionsController>(CompanionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
