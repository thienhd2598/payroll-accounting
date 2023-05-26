import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';

@Controller('staff')
export class StaffController {
    constructor(
        private staffService: StaffService
    ) { }

    @Get()
    getAllStaff() {
        return this.staffService.getAllStaff();
    };

    @Post('/create')
    createStaff(
        @Body() createStaffDto: CreateStaffDto
    ) {        
        return this.staffService.createStaff(createStaffDto);
    };

    @Post('/payroll')
    payrollStaff(
        @Body() body: { month: number, year: number, staffId: string }
    ) {        
        return this.staffService.payroll(body);
    };

    @Post('/payroll-all')
    payrollAllStaff(
        @Body() body: { month: number, year: number }
    ) {        
        return this.staffService.payrollAll(body);
    };

    @Patch('/:id')
    updateStaff(
        @Param('id') id: string,
        @Body() updateStaff: CreateStaffDto
    ) {
        return this.staffService.updateStaff(id, updateStaff);
    }

    @Delete('/:id')
    deleteStaff(@Param('id') id: string) {
        return this.staffService.deleteStaff(id)
    }
}
