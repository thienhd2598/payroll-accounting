import { Module } from '@nestjs/common';
import { AdvanceSalaryController } from './advance-salary.controller';

@Module({
  controllers: [AdvanceSalaryController]
})
export class AdvanceSalaryModule {}
