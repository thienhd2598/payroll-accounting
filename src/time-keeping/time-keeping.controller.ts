import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TimeKeepingService } from './time-keeping.service';
import { TimeKeepingDto } from './dto/time-keeping.dto';

@Controller('time-keeping')
export class TimeKeepingController {
    constructor(
        private timeKeepingService: TimeKeepingService
    ) { }

    @Get()
    getAllTimeKeeping() {
        return this.timeKeepingService.getAllTimeKeeping();
    };

    @Post('/create')
    createTimeKeeping(
        @Body() timeKeepingDto: TimeKeepingDto
    ) {
        return this.timeKeepingService.createTimeKeeping(timeKeepingDto);
    };

    @Patch('/:id')
    updateTimeKeeping(
        @Param('id') id: string,
        @Body() updateTimeKeeping: TimeKeepingDto
    ) {
        return this.timeKeepingService.updateTimeKeeping(id, updateTimeKeeping);
    }

    @Delete('/:id')
    deleteTimeKeeping(@Param('id') id: string) {
        return this.timeKeepingService.deleteTimeKeeping(id)
    }
}
