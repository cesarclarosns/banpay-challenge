import { ApiProperty } from '@nestjs/swagger';

export class FilmDto {
  @ApiProperty({
    description: 'Unique identifier representing a specific film',
  })
  id: string;

  @ApiProperty({
    description: 'Title of the film',
  })
  title: string;

  @ApiProperty({
    description: 'Original title of the film',
  })
  original_title: string;

  @ApiProperty({
    description: 'Orignal title in romanised form',
  })
  original_title_romanised: string;

  @ApiProperty({
    description: 'Description of the film',
  })
  description: string;

  @ApiProperty({
    description: 'Director of the film',
  })
  director: string;

  @ApiProperty({ description: 'Producer of the film' })
  producer: string;

  @ApiProperty({ description: 'Release year of film' })
  release_date: string;

  @ApiProperty({ description: 'Running time of the film in minutes' })
  running_time: string;

  @ApiProperty({ description: 'Rotten Tomato score of film' })
  rt_score: string;

  @ApiProperty({ description: 'People found in film' })
  people: string;

  @ApiProperty({ description: 'Species found in film' })
  species: string;

  @ApiProperty({ description: 'Locations found in film' })
  locations: string;

  @ApiProperty({ description: 'Vehicles found in film' })
  vehicles: string;

  @ApiProperty({ description: 'URL of film' })
  url: string;
}
