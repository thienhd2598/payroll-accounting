import { Module } from '@nestjs/common';
import { TimeKeepingController } from './time-keeping.controller';

@Module({
  controllers: [TimeKeepingController]
})
export class TimeKeepingModule {}
