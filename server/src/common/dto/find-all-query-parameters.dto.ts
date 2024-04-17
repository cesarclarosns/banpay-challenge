import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class FindAllQueryParametersDto {
  @ApiProperty()
  @IsNumberString()
  limit: number;

  @ApiProperty()
  @IsNumberString()
  skip: number;
}
