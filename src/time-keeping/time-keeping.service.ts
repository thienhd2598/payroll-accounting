import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeKeeping } from './time-keeping.entity';
import { Repository } from 'typeorm';
import { Staff } from 'src/staff/staff.entity';
import { IncomeTax } from 'src/income-tax/income-tax.entity';
import { TimeKeepingDto } from './dto/time-keeping.dto';

@Injectable()
export class TimeKeepingService {
    constructor(
        @InjectRepository(TimeKeeping) private timeKeepingRespository: Repository<TimeKeeping>,        
        @InjectRepository(Staff) private staffRespository: Repository<Staff>,
    ) { }

    async getAllTimeKeeping() {
        try {
            const timeKeepings = await this.timeKeepingRespository.findAndCount();

            return {
                statusCode: 200,
                message: 'Thành công',
                data: {
                    timeKeepings: timeKeepings?.[0] || [],
                    total: timeKeepings?.[1] || 0
                }
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Máy chủ hiện đang bảo trì, vui lòng khởi động lại'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    };

    async createTimeKeeping(createTimeKeeping: TimeKeepingDto) {
        const { month, year, work_days, work_hours, bonus_hours, bonus_hours_holiday, staffId } = createTimeKeeping;

        try {
            const staff = await this.staffRespository.findOne(staffId);

            const newTimeKeeping = this.timeKeepingRespository.create({
                month, year, work_days, work_hours, bonus_hours, bonus_hours_holiday, staff
            });

            await this.timeKeepingRespository.save(newTimeKeeping);

            return {
                statusCode: 200,
                message: 'Tạo tham số lương thành công',
                data: newTimeKeeping
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Máy chủ hiện đang bảo trì, vui lòng khởi động lại'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateTimeKeeping(id: string, updateTimeKeeping: TimeKeepingDto) {
        try {
            const { month, year, work_days, work_hours, bonus_hours, bonus_hours_holiday, staffId } = updateTimeKeeping;

            const staff = await this.staffRespository.findOne(staffId);

            const timeKeeping = await this.timeKeepingRespository.findOne({
                where: { id }
            });

            if (!timeKeeping) {
                throw new NotFoundException(`Không tìm thấy tham số lương ${id}`);
            }

            timeKeeping.month = month;
            timeKeeping.year = year;
            timeKeeping.work_days = work_days;
            timeKeeping.work_hours = work_hours;
            timeKeeping.bonus_hours = bonus_hours;
            timeKeeping.bonus_hours_holiday = bonus_hours_holiday;
            timeKeeping.staff = staff;            

            await this.timeKeepingRespository.save(timeKeeping);

            return {
                statusCode: 200,
                message: 'Cập nhật tham số lương thành công',
                data: timeKeeping
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Máy chủ hiện đang bảo trì, vui lòng khởi động lại'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    async deleteTimeKeeping(id: string) {
        const result = await this.timeKeepingRespository.delete({ id });

        if (result.affected === 0) {
            throw new NotFoundException(`Không tìm thấy tham số lương ${id}`);
        }

        return {
            statusCode: 200,
            message: 'Xóa tham số lương thành công',
        }
    }
}