import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateIncomeTaxDto {
  @IsString()
  name: string;

  @IsString()  
  rate: number;  
}
