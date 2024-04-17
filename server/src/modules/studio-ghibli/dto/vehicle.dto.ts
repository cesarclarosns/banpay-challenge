import { ApiProperty } from '@nestjs/swagger';

export class VehicleDto {
  @ApiProperty({
    description: 'Unique identifier representing a specific vehicle',
  })
  id: string;

  @ApiProperty({ description: 'Name of the vehicles' })
  name: string;

  @ApiProperty({ description: 'Description of the vehicle' })
  description: string;

  @ApiProperty({ description: 'Class of the vehicle' })
  vehicle_class: string;

  @ApiProperty({ description: 'Length of the vehicle in feet' })
  length: string;

  @ApiProperty({ description: 'Pilot of the vehicle' })
  pilot: string;

  @ApiProperty({ description: 'Array of films the vehicle appears in' })
  films: string;

  @ApiProperty({ description: 'Unique URL of the vehicle' })
  url: string;

  constructor(partial: Partial<VehicleDto>) {
    Object.assign(this, partial);
  }
}
