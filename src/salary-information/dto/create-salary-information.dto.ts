import { IsNumber, IsString } from 'class-validator';

export class CreateSalaryInformationDto {
    @IsNumber()
    salary_basic: number;

    @IsNumber()
    work_hours_standard: number;
    
    @IsNumber()
    work_day_standard: number;
    
    @IsNumber()
    insurance_social_rate: number;
    
    @IsNumber()
    insurance_health_rate: number;
    
    @IsNumber()
    insurance_unemployment_rate: number;
    
    @IsNumber()
    tax_personal: number;

    @IsString()
    staffId: string;   
}