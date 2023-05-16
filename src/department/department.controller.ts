import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
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
        return { abc: 123 }
    }

    @Post('/create')
    createDepartment(
        @Body() createDepartmentDto: CreateDepartmentDto
    ) {
        return this.departmentService.createDepartment(createDepartmentDto)
    }
}
