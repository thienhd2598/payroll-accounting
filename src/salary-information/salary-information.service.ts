import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SalaryInformation } from './salary-information.entity';
import { Repository } from 'typeorm';
import { Staff } from 'src/staff/staff.entity';
import { IncomeTax } from 'src/income-tax/income-tax.entity';
import { CreateSalaryInformationDto } from './dto/create-salary-information.dto';

@Injectable()
export class SalaryInformationService {
    constructor(
        @InjectRepository(SalaryInformation) private salaryInformationRespository: Repository<SalaryInformation>,        
        @InjectRepository(Staff) private staffRespository: Repository<Staff>,
    ) { }

    async getAllSalaryInformation() {
        try {
            const salaryInformations = await this.salaryInformationRespository.findAndCount();

            return {
                statusCode: 200,
                message: 'Thành công',
                data: {
                    salaryInformations: salaryInformations?.[0] || [],
                    total: salaryInformations?.[1] || 0
                }
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Máy chủ hiện đang bảo trì, vui lòng khởi động lại'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    };

    async createSalaryInformation(createSalaryInformation: CreateSalaryInformationDto) {
        const { salary_basic, work_day_standard, work_hours_standard, insurance_health_rate, insurance_social_rate, insurance_unemployment_rate, tax_personal, staffId } = createSalaryInformation;

        try {
            const staff = await this.staffRespository.findOne(staffId);

            const newSalaryInformation = this.salaryInformationRespository.create({
                salary_basic, work_day_standard, work_hours_standard, insurance_health_rate, insurance_social_rate, insurance_unemployment_rate, tax_personal, staff
            });

            await this.salaryInformationRespository.save(newSalaryInformation);

            return {
                statusCode: 200,
                message: 'Tạo tham số lương thành công',
                data: newSalaryInformation
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Máy chủ hiện đang bảo trì, vui lòng khởi động lại'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateSalaryInformation(id: string, updateSalaryInformation: CreateSalaryInformationDto) {
        try {
            const { salary_basic, work_day_standard, work_hours_standard, insurance_health_rate, insurance_social_rate, insurance_unemployment_rate, tax_personal, staffId } = updateSalaryInformation;

            const staff = await this.staffRespository.findOne(staffId);

            const salaryInformation = await this.salaryInformationRespository.findOne({
                where: { id }
            });

            if (!salaryInformation) {
                throw new NotFoundException(`Không tìm thấy tham số lương ${id}`);
            }

            salaryInformation.salary_basic = salary_basic;
            salaryInformation.work_day_standard = work_day_standard;
            salaryInformation.work_hours_standard = work_hours_standard;
            salaryInformation.insurance_health_rate = insurance_health_rate;
            salaryInformation.insurance_social_rate = insurance_social_rate;
            salaryInformation.insurance_unemployment_rate = insurance_unemployment_rate;
            salaryInformation.tax_personal = tax_personal;
            salaryInformation.staff = staff;            

            await this.salaryInformationRespository.save(salaryInformation);

            return {
                statusCode: 200,
                message: 'Cập nhật tham số lương thành công',
                data: salaryInformation
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Máy chủ hiện đang bảo trì, vui lòng khởi động lại'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    async deleteSalaryInformation(id: string) {
        const result = await this.salaryInformationRespository.delete({ id });

        if (result.affected === 0) {
            throw new NotFoundException(`Không tìm thấy tham số lương ${id}`);
        }

        return {
            statusCode: 200,
            message: 'Xóa tham số lương thành công',
        }
    }
}