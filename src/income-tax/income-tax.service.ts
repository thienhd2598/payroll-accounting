 import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IncomeTax } from './income-tax.entity';
import { Repository } from 'typeorm';
import { CreateIncomeTaxDto } from './dto/income-tax.dto';

@Injectable()
export class IncomeTaxService {
    constructor(
        @InjectRepository(IncomeTax) private incomeTaxRespository: Repository<IncomeTax>,
    ) { }

    async getAllIncomeTax() {
        try {
            const incomeTaxs = await this.incomeTaxRespository.findAndCount();

            return {
                statusCode: 200,
                message: 'Thành công',
                data: {
                    incomeTaxs: incomeTaxs?.[0] || [],
                    total: incomeTaxs?.[1] || 0
                }
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Máy chủ hiện đang bảo trì, vui lòng khởi động lại'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    };

    async createIncomeTax(createIncomeTaxDto: CreateIncomeTaxDto) {
        const { name, rate } = createIncomeTaxDto;

        try {
            const newIncomeTax = this.incomeTaxRespository.create({
                name, rate
            });

            await this.incomeTaxRespository.save(newIncomeTax);

            return {
                statusCode: 200,
                message: 'Tạo cấp bậc thuế thành công',
                data: newIncomeTax
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Máy chủ hiện đang bảo trì, vui lòng khởi động lại'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateIncomeTax(id: string, updateIncomeTaxDto: CreateIncomeTaxDto) {
        const { name, rate } = updateIncomeTaxDto;

        try {
            const incomeTax = await this.incomeTaxRespository.findOne({
                where: { id }
            });

            if (!incomeTax) {
                throw new NotFoundException(`Không tìm thấy cấp bậc thuế ${id}`);
            }

            incomeTax.name = name;
            incomeTax.rate = rate;

            await this.incomeTaxRespository.save(incomeTax);

            return {
                statusCode: 200,
                message: 'Cập nhật cấp bậc thuế thành công',
                data: incomeTax
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Máy chủ hiện đang bảo trì, vui lòng khởi động lại'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteIncomeTax(id: string) {
        const result = await this.incomeTaxRespository.delete({ id });

        if (result.affected === 0) {
            throw new NotFoundException(`Không tìm thấy cấp bậc thuế ${id}`);
        }

        return {
            statusCode: 200,
            message: 'Xóa cấp bậc thuế thành công',
        }
    }
}