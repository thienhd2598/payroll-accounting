import { Module } from '@nestjs/common';
import { IncomeTaxController } from './income-tax.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomeTax } from './income-tax.entity';
import { IncomeTaxService } from './income-tax.service';

@Module({
  imports: [TypeOrmModule.forFeature([IncomeTax])],
  controllers: [IncomeTaxController],
  providers: [IncomeTaxService]
})
export class IncomeTaxModule {}
