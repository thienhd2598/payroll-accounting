import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AdvanceSalaryService } from './advance-salary.service';
import { AdvanceSalaryDto } from './dto/advance-salary.dto';

@Controller('advance-salary')
export class AdvanceSalaryController {
    constructor(
        private advanceSalaryService: AdvanceSalaryService
    ) {}

    @Get()
    getAllAdvanceSalary() {
        return this.advanceSalaryService.getAllAdvanceSalary();
    };

    @Post('/create')
    createAdvanceSalary(advanceSalaryDto: AdvanceSalaryDto) {
        return this.advanceSalaryService.createAdvanceSalary(advanceSalaryDto);
    };
    
    @Patch('/:id')
    updateAdvanceSalary(
        @Param('id') id: string,
        @Body() updateAdvanceSalary: AdvanceSalaryDto
    ) {
        return this.advanceSalaryService.updateAdvanceSalary(id, updateAdvanceSalary);
    }

    @Delete('/:id')
    deleteAdvanceSalary(@Param('id') id: string) {
        return this.advanceSalaryService.deleteAdvanceSalary(id)
    }
}
