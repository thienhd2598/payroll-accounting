import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './staff.entity';
import { Repository } from 'typeorm';
import { Department } from 'src/department/department.entity';
import { Position } from 'src/position/position.entity';
import { IncomeTax } from 'src/income-tax/income-tax.entity';
import { CreateStaffDto } from './dto/create-staff.dto';

@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(Staff) private staffRespository: Repository<Staff>,
        @InjectRepository(Department) private departmentRespository: Repository<Department>,
        @InjectRepository(Position) private positionRespository: Repository<Position>,
        @InjectRepository(IncomeTax) private incomeTaxRespository: Repository<IncomeTax>,
    ) { }

    async getAllStaff() {
        try {
            const staffs = await this.staffRespository.findAndCount();

            return {
                statusCode: 200,
                message: 'Thành công',
                data: {
                    staffs: staffs?.[0] || [],
                    total: staffs?.[1] || 0
                }
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Máy chủ hiện đang bảo trì, vui lòng khởi động lại'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    };

    async createStaff(createStaffDto: CreateStaffDto) {
        const { name, phone, birthday, address, date_from, tax_code, departmentId, positionId, incomeTaxId } = createStaffDto;

        try {
            const [department, position, income_tax] = await Promise.all([
                this.departmentRespository.findOne(departmentId),
                this.positionRespository.findOne(positionId),
                this.incomeTaxRespository.findOne(incomeTaxId),
            ])
                .then(data => data)
                .catch(_error => [null, null, null]);

            console.log({ department, position, income_tax });

            const newStaff = this.staffRespository.create({
                name,
                phone,
                birthday,
                date_from,
                address,
                tax_code,
                department,
                position,
                income_tax
            });

            await this.staffRespository.save(newStaff);

            return {
                statusCode: 200,
                message: 'Tạo nhân viên thành công',
                data: newStaff
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Máy chủ hiện đang bảo trì, vui lòng khởi động lại'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateStaff(id: string, updateStaff: CreateStaffDto) {
        try {
            const { name, phone, birthday, address, date_from, tax_code, departmentId, positionId, incomeTaxId } = updateStaff;

            const [department, position, income_tax] = await Promise.all([
                this.departmentRespository.findOne(departmentId),
                this.positionRespository.findOne(positionId),
                this.incomeTaxRespository.findOne(incomeTaxId),
            ])
                .then(data => data)
                .catch(_error => [null, null, null]);

            const staff = await this.staffRespository.findOne({
                where: { id }
            });

            if (!staff) {
                throw new NotFoundException(`Không tìm thấy nhân viên ${id}`);
            }

            staff.name = name;
            staff.phone = phone;
            staff.birthday = birthday;
            staff.address = address;
            staff.date_from = date_from;
            staff.tax_code = tax_code;
            staff.department = department;
            staff.position = position;
            staff.income_tax = income_tax;

            await this.staffRespository.save(staff);

            return {
                statusCode: 200,
                message: 'Cập nhật nhân viên thành công',
                data: staff
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Máy chủ hiện đang bảo trì, vui lòng khởi động lại'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    async deleteStaff(id: string) {
        const result = await this.staffRespository.delete({ id });

        if (result.affected === 0) {
            throw new NotFoundException(`Không tìm thấy nhân viên ${id}`);
        }

        return {
            statusCode: 200,
            message: 'Xóa nhân viên thành công',
        }
    }
}