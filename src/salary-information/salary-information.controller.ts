import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SalaryInformationService } from './salary-information.service';
import { CreateSalaryInformationDto } from './dto/create-salary-information.dto';

@Controller('salary-information')
export class SalaryInformationController {
    constructor(
        private salaryInformationService: SalaryInformationService
    ) { }

    @Get()
    getAllSalaryInformation() {        
        return this.salaryInformationService.getAllSalaryInformation();
    };

    @Post('/create')
    createSalaryInformation(
        @Body() createSalaryInformationDto: CreateSalaryInformationDto
    ) {
        return this.salaryInformationService.createSalaryInformation(createSalaryInformationDto);
    };

    @Patch('/:id')
    updateSalaryInformation(
        @Param('id') id: string,
        @Body() updateSalaryInformation: CreateSalaryInformationDto
    ) {
        return this.salaryInformationService.updateSalaryInformation(id, updateSalaryInformation);
    }

    @Delete('/:id')
    deleteSalaryInformation(@Param('id') id: string) {
        return this.salaryInformationService.deleteSalaryInformation(id)
    }
}
