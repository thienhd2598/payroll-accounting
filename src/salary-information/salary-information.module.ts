import { Module } from '@nestjs/common';
import { SalaryInformationController } from './salary-information.controller';

@Module({
  controllers: [SalaryInformationController]
})
export class SalaryInformationModule {}
