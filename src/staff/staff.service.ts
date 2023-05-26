import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './staff.entity';
import { Repository } from 'typeorm';
import { Department } from 'src/department/department.entity';
import { Position } from 'src/position/position.entity';
import { IncomeTax } from 'src/income-tax/income-tax.entity';
import { CreateStaffDto } from './dto/create-staff.dto';
import { SalaryInformation } from 'src/salary-information/salary-information.entity';

@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(Staff) private staffRespository: Repository<Staff>,
        @InjectRepository(Department) private departmentRespository: Repository<Department>,
        @InjectRepository(Position) private positionRespository: Repository<Position>,
        @InjectRepository(IncomeTax) private incomeTaxRespository: Repository<IncomeTax>,
        @InjectRepository(SalaryInformation) private salaryInformationRespository: Repository<SalaryInformation>,
    ) { }

    async getAllStaff() {
        try {
            const staffs: any = await this.staffRespository.find({
                relations: ['department', 'income_tax', 'position']
            })
            // const staffs: any = await this.staffRespository
            //     .createQueryBuilder('staff')
            //     .leftJoinAndSelect('staff.department', 'id')
            //     .leftJoinAndSelect('staff.position', 'id')
            // .find({                            
            //     relations: ['department', 'income_tax', 'position']
            // })         

            const dataStaffs = staffs?.map(_staff => {
                const { department, income_tax, position } = _staff || {};

                return {
                    ..._staff,
                    department,
                    income_tax,
                    position
                }
            })

            return {
                statusCode: 200,
                message: 'Thành công',
                data: {
                    staffs: dataStaffs || [],
                    total: staffs?.length || 0
                }
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Máy chủ hiện đang bảo trì, vui lòng khởi động lại'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    };

    async payroll({ month, year, staffId }: { month: number, year: number, staffId: string }) {
        console.log({ month, year, staffId });
        try {
            const staffs: any = await this.staffRespository.find({
                join: {
                    alias: 'staff',
                    innerJoin: { time_keeping: 'staff.time_keeping' }
                },
                where: entity => {
                    entity.where({
                        id: staffId,
                    }).andWhere('time_keeping.month = :month', { month })
                        .andWhere('time_keeping.year = :year', { year })
                },
                relations: ['department', 'income_tax', 'position']
            });

            const { id, name, department, income_tax, position, salary_information, time_keeping, advance_salary } = staffs[0] || {};
            const { salary_basic, work_day_standard, work_hours_standard, insurance_social_rate, insurance_health_rate, insurance_unemployment_rate } = salary_information[0] || {};
            const { work_days, work_days_holiday, bonus_hours, bonus_hours_holiday } = time_keeping[0];
            const { price } = advance_salary[0] || {};
            const { rate } = income_tax || {};
            const { allowance } = position || {};

            const salary_per_day = Number(salary_basic) / Number(work_day_standard);
            const salary_per_hours = Math.round(salary_per_day / Number(work_hours_standard));

            const salary_current = salary_per_day * (Number(work_days) + Number(work_days_holiday));

            const salary_bonus = Math.round(
                + salary_per_hours * Number(bonus_hours)
                + salary_per_hours * Number(bonus_hours_holiday) * 1.2
                + (Number(salary_basic) * allowance) / 100
            );

            const salary_diff = Math.round(
                Number(price || 0)
                + (Number(salary_basic) * Number(insurance_health_rate)) / 100
                + (Number(salary_basic) * Number(insurance_social_rate)) / 100
                + (Number(salary_basic) * Number(insurance_unemployment_rate)) / 100
                + (Number(salary_basic) * rate) / 100
            );

            const salaryTotal = Math.round(salary_current + salary_bonus - salary_diff);

            return {
                statusCode: 200,
                message: `Tính lương nhân viên ${name} tháng ${month} năm ${year} thành công`,
                data: {
                    date: `${month} - ${year}`,
                    name,
                    salary_basic,
                    work_days,
                    work_days_holiday,
                    bonus_hours,
                    bonus_hours_holiday,
                    price: Number(price || 0),
                    salary_bonus,
                    allowance: Math.round((Number(salary_basic) * allowance) / 100),
                    insurance_health_rate: Math.round((Number(salary_basic) * Number(insurance_health_rate)) / 100),
                    insurance_social_rate: Math.round((Number(salary_basic) * Number(insurance_social_rate)) / 100),
                    insurance_unemployment_rate: Math.round((Number(salary_basic) * Number(insurance_unemployment_rate)) / 100),
                    rate: Math.round((Number(salary_basic) * rate) / 100),
                    salary_diff,
                    salaryTotal
                }
            }
        } catch (error) {
            return {
                statusCode: 500,
                message: `Không tìm thấy bảng chấm công tháng ${month} năm ${year} của nhân viên, xin vui lòng thử lại!`
            }
        }
    }

    async payrollAll({ month, year }: { month: number, year: number }) {
        try {
            const staffs: any = await this.staffRespository.find();
            console.log({ staffs });
            const dataAll = await Promise.all(staffs?.map(
                _staff => this.payroll({
                    month,
                    year,
                    staffId: _staff.id
                })
            ));

            const dataFilter = dataAll
                ?.filter((_data: any) => _data?.statusCode == 200)
                ?.map((_data: any) => _data?.data);
            
            return {
                statusCode: 200,
                message: `Tính lương nhân viên tháng ${month} năm ${year} thành công`,
                data: dataFilter
            }
        } catch (error) {
            return {
                statusCode: 500,
                message: `Không tìm thấy bảng chấm công tháng ${month} năm ${year} của nhân viên, xin vui lòng thử lại!`
            }
        }
    }

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
                message: 'Máy chủ hiện đang bảo trì, vui lòng khởi động lại'
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
                message: 'Máy chủ hiện đang bảo trì, vui lòng khởi động lại'
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