import { Test, TestingModule } from '@nestjs/testing';
import { SalaryInformationController } from './salary-information.controller';

describe('SalaryInformationController', () => {
  let controller: SalaryInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalaryInformationController],
    }).compile();

    controller = module.get<SalaryInformationController>(SalaryInformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
