import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdvanceSalary } from './advance-salary.entity';
import { Repository } from 'typeorm';
import { Staff } from 'src/staff/staff.entity';
import { AdvanceSalaryDto } from './dto/advance-salary.dto';

@Injectable()
export class AdvanceSalaryService {
    constructor(
        @InjectRepository(AdvanceSalary) private advanceSalaryRespository: Repository<AdvanceSalary>,        
        @InjectRepository(Staff) private staffRespository: Repository<Staff>,
    ) { }

    async getAllAdvanceSalary() {
        try {
            const advanceSalarys = await this.advanceSalaryRespository.findAndCount();

            return {
                statusCode: 200,
                message: 'Thành công',
                data: {
                    advanceSalarys: advanceSalarys?.[0] || [],
                    total: advanceSalarys?.[1] || 0
                }
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Máy chủ hiện đang bảo trì, vui lòng khởi động lại'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    };

    async createAdvanceSalary(createAdvanceSalary: AdvanceSalaryDto) {
        const { name, price, note, staffId } = createAdvanceSalary;

        try {
            const staff = await this.staffRespository.findOne(staffId);

            const newAdvanceSalary = this.advanceSalaryRespository.create({
                name, price, note, debt_account: 331, has_account: 113, staff
            });

            await this.advanceSalaryRespository.save(newAdvanceSalary);

            return {
                statusCode: 200,
                message: 'Tạo thông tin ứng lương thành công',
                data: newAdvanceSalary
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Máy chủ hiện đang bảo trì, vui lòng khởi động lại'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateAdvanceSalary(id: string, updateAdvanceSalary: AdvanceSalaryDto) {
        try {
            const { name, price, note, staffId } = updateAdvanceSalary;

            const staff = await this.staffRespository.findOne(staffId);

            const advanceSalary = await this.advanceSalaryRespository.findOne({
                where: { id }
            });

            if (!advanceSalary) {
                throw new NotFoundException(`Không tìm thấy thông tin ứng lương ${id}`);
            }

            advanceSalary.name = name;
            advanceSalary.note = note;
            advanceSalary.price = price;
            advanceSalary.staff = staff;            

            await this.advanceSalaryRespository.save(advanceSalary);

            return {
                statusCode: 200,
                message: 'Cập nhật thông tin ứng lương thành công',
                data: AdvanceSalary
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Máy chủ hiện đang bảo trì, vui lòng khởi động lại'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    async deleteAdvanceSalary(id: string) {
        const result = await this.advanceSalaryRespository.delete({ id });

        if (result.affected === 0) {
            throw new NotFoundException(`Không tìm thấy thông tin ứng lương ${id}`);
        }

        return {
            statusCode: 200,
            message: 'Xóa thông tin ứng lương thành công',
        }
    }
}