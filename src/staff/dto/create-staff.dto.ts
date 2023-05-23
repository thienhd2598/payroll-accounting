import { IsNumber, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateStaffDto {
    @IsString()
    name: string;

    @IsString()
    phone: string;

    @IsString()
    birthday: string;

    @IsString()
    address: string;

    @IsString()
    date_from: string;

    @IsString()
    tax_code: string;

    @IsString()
    departmentId: string;

    @IsString()
    positionId: string;

    @IsString()
    incomeTaxId: string;
}
