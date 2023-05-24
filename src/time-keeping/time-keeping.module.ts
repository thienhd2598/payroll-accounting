import { Module } from '@nestjs/common';
import { TimeKeepingController } from './time-keeping.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeKeeping } from './time-keeping.entity';
import { Staff } from 'src/staff/staff.entity';
import { TimeKeepingService } from './time-keeping.service';

@Module({
  imports: [TypeOrmModule.forFeature([TimeKeeping, Staff])],
  controllers: [TimeKeepingController],
  providers: [TimeKeepingService]
})

export class TimeKeepingModule {}
