import { IsNumber, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreatePositionDto {
  @IsString()
  name: string;

  @IsNumber()  
  allowance: number;  
}
