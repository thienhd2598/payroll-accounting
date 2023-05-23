import { Module } from '@nestjs/common';
import { SalaryInformationController } from './salary-information.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalaryInformation } from './salary-information.entity';
import { Staff } from 'src/staff/staff.entity';
import { SalaryInformationService } from './salary-information.service';

@Module({
  imports: [TypeOrmModule.forFeature([SalaryInformation, Staff])],
  controllers: [SalaryInformationController],
  providers: [SalaryInformationService]
})
export class SalaryInformationModule { }
