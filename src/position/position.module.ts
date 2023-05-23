import { Module } from '@nestjs/common';
import { PositionController } from './position.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './position.entity';
import { PositionService } from './position.service';

@Module({
  imports: [TypeOrmModule.forFeature([Position])],
  controllers: [PositionController],
  providers: [PositionService]
})
export class PositionModule {}
