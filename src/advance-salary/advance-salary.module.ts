import { Module } from '@nestjs/common';
import { AdvanceSalaryController } from './advance-salary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvanceSalary } from './advance-salary.entity';
import { AdvanceSalaryService } from './advance-salary.service';
import { Staff } from 'src/staff/staff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdvanceSalary, Staff])],
  controllers: [AdvanceSalaryController],
  providers: [AdvanceSalaryService]
})
export class AdvanceSalaryModule {}
