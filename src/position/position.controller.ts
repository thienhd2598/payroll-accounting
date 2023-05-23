import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';

@Controller('position')
export class PositionController {
    private logger = new Logger('PositionController');

    constructor(
        private positionService: PositionService
    ) {}

    @Get()
    getAllPosition() {
        return this.positionService.getAllPosition();
    }

    @Post('/create')
    createPosition(
        @Body() createPositionDto: CreatePositionDto
    ) {
        return this.positionService.createPosition(createPositionDto)
    }

    @Patch('/:id') 
    updatePosition(
        @Param('id') id: string,
        @Body() updatePosition: CreatePositionDto
    ) {
        return this.positionService.updatePosition(id, updatePosition);
    }

    @Delete('/:id') 
    deletePosition(@Param('id') id: string) {
        return this.positionService.deletePosition(id)
    };
}
