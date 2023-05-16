import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  name: string;

  @IsString()  
  phone: string;  
}
