import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './staff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Staff])],
  controllers: [StaffController]
})
export class StaffModule {}
