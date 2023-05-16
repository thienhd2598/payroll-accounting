import { Module } from '@nestjs/common';
import { IncomeTaxController } from './income-tax.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomeTax } from './income-tax.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IncomeTax])],
  controllers: [IncomeTaxController]
})
export class IncomeTaxModule {}
