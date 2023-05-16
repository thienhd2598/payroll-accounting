import { Module } from '@nestjs/common';
import { PositionController } from './position.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Position])],
  controllers: [PositionController]
})
export class PositionModule {}
