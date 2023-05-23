import { Test, TestingModule } from '@nestjs/testing';
import { IncomeTaxController } from './income-tax.controller';

describe('IncomeTaxController', () => {
  let controller: IncomeTaxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncomeTaxController],
    }).compile();

    controller = module.get<IncomeTaxController>(IncomeTaxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
