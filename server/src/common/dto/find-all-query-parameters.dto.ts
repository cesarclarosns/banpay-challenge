import { IsNumberString } from 'class-validator';

export class FindAllQueryParametersDto {
  @IsNumberString()
  limit: number;

  @IsNumberString()
  skip: number;
}
