import { ApiProperty } from '@nestjs/swagger';

export class PeopleDto {
  @ApiProperty({
    description: 'Unique identifier representing a specific person',
  })
  id: string;

  @ApiProperty({ description: 'Name of the person' })
  name: string;

  @ApiProperty({ description: 'Gender of the person' })
  gender: string;

  @ApiProperty({ description: 'Age, if known, of the person' })
  age: string;

  @ApiProperty({ description: 'Eye color of the person' })
  eye_color: string;

  @ApiProperty({ description: 'Hair color of the person' })
  hair_color: string;

  @ApiProperty({
    description: 'Array of films the person appears in',
    isArray: true,
    type: String,
  })
  films: string[];

  @ApiProperty({ description: 'Species the person belongs to' })
  species: string;

  @ApiProperty({ description: 'Unique url of the person' })
  url: string;

  constructor(partial: Partial<PeopleDto>) {
    Object.assign(this, partial);
  }
}
