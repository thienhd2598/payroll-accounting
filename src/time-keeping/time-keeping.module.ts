import { Module } from '@nestjs/common';
import { TimeKeepingController } from './time-keeping.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeKeeping } from './time-keeping.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimeKeeping])],
  controllers: [TimeKeepingController]
})

export class TimeKeepingModule {}
