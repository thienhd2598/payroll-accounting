import { IsNumber, IsString } from 'class-validator';

export class CreateSalaryInformationDto {
    @IsNumber()
    month: number;

    @IsNumber()
    year: number;
    
    @IsNumber()
    work_days: number;
    
    @IsNumber()
    work_hours: number;
    
    @IsNumber()
    bonus_hours: number;
    
    @IsNumber()
    bonus_hours_holiday: number;

    @IsString()
    staffId: string;   
}