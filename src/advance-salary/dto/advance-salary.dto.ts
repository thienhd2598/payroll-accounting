import { IsNumber, IsString } from 'class-validator';

export class AdvanceSalaryDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsString()
    note: string;    

    @IsString()
    staffId: string;
}