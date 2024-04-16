import { PickType } from '@nestjs/swagger';

import { QueryParametersDto } from './query-parameters.dto';

export class QueryParametersOneDto extends PickType(QueryParametersDto, [
  'fields',
]) {}
