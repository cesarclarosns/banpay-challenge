import { ApiProperty } from '@nestjs/swagger';

export class SpeciesDto {
  @ApiProperty({
    description: 'Unique identifier representing a specific species',
  })
  id: string;

  @ApiProperty({ description: 'Name of the species' })
  name: string;

  @ApiProperty({ description: 'Classification of the species' })
  classification: string;

  @ApiProperty({ description: 'Eye color of the species' })
  eye_color: string;

  @ApiProperty({ description: 'Hair color of the species' })
  hair_color: string;

  @ApiProperty({ description: 'People belonging to the species' })
  people: string;

  @ApiProperty({ description: 'Array of films the species appears in' })
  films: string;

  @ApiProperty({ description: 'Unique url of the species' })
  url: string;

  constructor(partial: Partial<SpeciesDto>) {
    Object.assign(this, partial);
  }
}
