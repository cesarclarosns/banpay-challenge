import { ApiProperty } from '@nestjs/swagger';

export class LocationDto {
  @ApiProperty({
    description: 'Unique identifier representing a specific location',
  })
  id: string;

  @ApiProperty({ description: 'Name of location' })
  name: string;

  @ApiProperty({ description: 'Climate of location' })
  climate: string;

  @ApiProperty({ description: 'Terrain type of location' })
  terrain: string;

  @ApiProperty({ description: 'Percent of location covered in water' })
  surface_water: string;

  @ApiProperty({ description: 'Array of residents in location' })
  residents: string[];

  @ApiProperty({ description: 'Array of films the location appears in' })
  films: string;

  @ApiProperty({ description: 'Individual URL of the location' })
  url: string;
}
