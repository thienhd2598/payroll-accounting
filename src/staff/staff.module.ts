import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './staff.entity';
import { StaffService } from './staff.service';
import { Department } from 'src/department/department.entity';
import { IncomeTax } from 'src/income-tax/income-tax.entity';
import { Position } from 'src/position/position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Staff, Department, IncomeTax, Position])],
  controllers: [StaffController],
  providers: [StaffService]
})
export class StaffModule {}
