import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Injectable()
export class DepartmentService {
    constructor(
        @InjectRepository(Department) private departmentRespository: Repository<Department>,
    ) { }

    async getAllDepartment() {

    };

    async createDepartment(createDepartmentDto: CreateDepartmentDto) {
        const { name, phone } = createDepartmentDto;

        try {
            const newDepartment = this.departmentRespository.create({
                name, phone
            });
            
    
            await this.departmentRespository.save(newDepartment);
    
            return {
                statusCode: 200,
                message: 'Tạo phòng ban thành công',
                data: newDepartment
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Máy chủ hiện đang bảo trì, vui lòng khởi động lại'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}