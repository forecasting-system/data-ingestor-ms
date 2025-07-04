import { IsDate, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { IsFirstDayOfMonth } from 'src/validators/firstDayOfMonth';

export class SalesDataEntryDto {
  @IsDate()
  @Type(() => Date)
  @IsFirstDayOfMonth()
  date: Date;

  @IsNumber()
  @IsPositive()
  value: number;
}
