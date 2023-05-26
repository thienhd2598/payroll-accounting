import { IsString, Matches, MaxLength, MinLength, IsDecimal, IsNumber } from 'class-validator';

export class CreatePositionDto {
  @IsString()
  name: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  allowance: number;  
}
