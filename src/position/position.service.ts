import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from './position.entity';
import { Repository } from 'typeorm';
import { CreatePositionDto } from './dto/create-position.dto';

@Injectable()
export class PositionService {
    constructor(
        @InjectRepository(Position) private positionRespository: Repository<Position>,
    ) { }

    async getAllPosition() {
        try {
            const positions = await this.positionRespository.findAndCount();

            return {
                statusCode: 200,
                message: 'Thành công',
                data: {
                    positions: positions?.[0] || [],
                    total: positions?.[1] || 0
                }
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Máy chủ hiện đang bảo trì, vui lòng khởi động lại'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    };

    async createPosition(createPositionDto: CreatePositionDto) {
        const { name, allowance } = createPositionDto;

        try {
            const newPosition = this.positionRespository.create({
                name, allowance
            });

            await this.positionRespository.save(newPosition);

            return {
                statusCode: 200,
                message: 'Tạo chức vụ thành công',
                data: newPosition
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Máy chủ hiện đang bảo trì, vui lòng khởi động lại'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updatePosition(id: string, updatePositionDto: CreatePositionDto) {
        const { name, allowance } = updatePositionDto;

        try {
            const position = await this.positionRespository.findOne({
                where: { id }
            });

            if (!position) {
                throw new NotFoundException(`Không tìm thấy chức vụ ${id}`);
            }

            position.name = name;
            position.allowance = allowance;

            await this.positionRespository.save(position);

            return {
                statusCode: 200,
                message: 'Cập nhật chức vụ thành công',
                data: position
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Máy chủ hiện đang bảo trì, vui lòng khởi động lại'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deletePosition(id: string) {
        const result = await this.positionRespository.delete({ id });

        if (result.affected === 0) {
            throw new NotFoundException(`Không tìm thấy chức vụ ${id}`);
        }

        return {
            statusCode: 200,
            message: 'Xóa chức vụ thành công',
        }
    }
}