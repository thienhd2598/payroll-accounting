import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
        try {
            const departments = await this.departmentRespository.findAndCount();

            return {
                statusCode: 200,
                message: 'Thành công',
                data: {
                    departments: departments?.[0] || [],
                    total: departments?.[1] || 0
                }
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Máy chủ hiện đang bảo trì, vui lòng khởi động lại'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
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
                message: 'Máy chủ hiện đang bảo trì, vui lòng khởi động lại'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateDepartment(id: string, updateDepartmentDto: CreateDepartmentDto) {
        const { name, phone } = updateDepartmentDto;

        try {
            const department = await this.departmentRespository.findOne({
                where: { id }
            });

            if (!department) {
                throw new NotFoundException(`Không tìm thấy phòng ban ${id}`);
            }

            department.name = name;
            department.phone = phone;

            await this.departmentRespository.save(department);

            return {
                statusCode: 200,
                message: 'Cập nhật phòng ban thành công',
                data: department
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Máy chủ hiện đang bảo trì, vui lòng khởi động lại'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteDepartment(id: string) {
        const result = await this.departmentRespository.delete({ id });

        if (result.affected === 0) {
            throw new NotFoundException(`Không tìm thấy phòng ban ${id}`);
        }

        return {
            statusCode: 200,
            message: 'Xóa phòng ban thành công',
        }
    }
}