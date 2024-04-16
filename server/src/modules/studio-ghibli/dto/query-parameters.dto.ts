import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsOptional, IsString, Max } from 'class-validator';

export class QueryParametersDto {
  @ApiProperty({
    description: 'Comma-separated list of fields to include in the response',
  })
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  @IsArray()
  @IsString({ each: true })
  fields?: string[];

  @ApiProperty({ description: 'Amount of results (default 50) (maximum 250)' })
  @IsOptional()
  @Transform(({ value }) => +value)
  @Max(250)
  limit?: number;
}
