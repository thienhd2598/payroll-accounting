import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { IncomeTaxService } from './income-tax.service';
import { CreateIncomeTaxDto } from './dto/income-tax.dto';

@Controller('income-tax')
export class IncomeTaxController {
    private logger = new Logger('IncomeTaxController');

    constructor(
        private incomeTaxService: IncomeTaxService
    ) {}

    @Get()
    getAllIncomeTax() {
        return this.incomeTaxService.getAllIncomeTax();
    }

    @Post('/create')
    createIncomeTax(
        @Body() createIncomeTaxDto: CreateIncomeTaxDto
    ) {
        return this.incomeTaxService.createIncomeTax(createIncomeTaxDto)
    }

    @Patch('/:id') 
    updateIncomeTax(
        @Param('id') id: string,
        @Body() updateIncomeTax: CreateIncomeTaxDto
    ) {
        return this.incomeTaxService.updateIncomeTax(id, updateIncomeTax);
    }

    @Delete('/:id') 
    deleteIncomeTax(@Param('id') id: string) {
        return this.incomeTaxService.deleteIncomeTax(id)
    };
}
