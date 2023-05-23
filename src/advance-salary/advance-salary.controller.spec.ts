import { Test, TestingModule } from '@nestjs/testing';
import { AdvanceSalaryController } from './advance-salary.controller';

describe('AdvanceSalaryController', () => {
  let controller: AdvanceSalaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvanceSalaryController],
    }).compile();

    controller = module.get<AdvanceSalaryController>(AdvanceSalaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
