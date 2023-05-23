import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Controller('department')
export class DepartmentController {
    private logger = new Logger('DepartmentController');

    constructor(
        private departmentService: DepartmentService
    ) {}

    @Get()
    getAllDepartment() {
        return this.departmentService.getAllDepartment();
    }

    @Post('/create')
    createDepartment(
        @Body() createDepartmentDto: CreateDepartmentDto
    ) {
        return this.departmentService.createDepartment(createDepartmentDto)
    }

    @Patch('/:id') 
    updateDepartment(
        @Param('id') id: string,
        @Body() updateDepartment: CreateDepartmentDto
    ) {
        return this.departmentService.updateDepartment(id, updateDepartment);
    }

    @Delete('/:id') 
    deleteDepartment(@Param('id') id: string) {
        return this.departmentService.deleteDepartment(id)
    };
}
