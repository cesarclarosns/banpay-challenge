import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { Roles } from '../auth/decorators/roles.decorator';
import { FilmDto } from './dto/film.dto';
import { LocationDto } from './dto/location.dto';
import { PeopleDto } from './dto/people.dto';
import { QueryParametersAllDto } from './dto/query-parameters-all.dto';
import { QueryParametersOneDto } from './dto/query-parameters-one.dto';
import { SpeciesDto } from './dto/species.dto';
import { VehicleDto } from './dto/vehicle.dto';
import { StudioGhibliService } from './studio-ghibli.service';

@ApiTags('studio-ghibli')
@Controller('studio-ghibli')
export class StudioGhibliController {
  constructor(private readonly studioGhibliService: StudioGhibliService) {}

  @Roles(['admin', 'films'])
  @Get('films')
  @ApiOperation({ summary: 'Returns all films' })
  @ApiBody({ type: [FilmDto] })
  async findAllFilms(@Query() queryParametersAllDto: QueryParametersAllDto) {
    return await this.studioGhibliService.findAllFilms(queryParametersAllDto);
  }

  @Roles(['admin', 'films'])
  @Get('films/:id')
  @ApiOperation({ summary: 'Returns a film' })
  @ApiParam({ description: 'Film ID', name: 'id' })
  @ApiBody({ type: [FilmDto] })
  async findOneFilm(
    @Param('id') id: string,
    @Query() queryParametersOneDto: QueryParametersOneDto,
  ) {
    return await this.studioGhibliService.findOneFilm(
      id,
      queryParametersOneDto,
    );
  }

  @Roles(['admin', 'people'])
  @Get('people')
  @ApiOperation({ summary: 'Returns all people' })
  @ApiBody({ type: [PeopleDto] })
  async findAllPeople(@Query() queryParametersAllDto: QueryParametersAllDto) {
    return await this.studioGhibliService.findAllPeople(queryParametersAllDto);
  }

  @Roles(['admin', 'people'])
  @Get('people/:id')
  @ApiOperation({ summary: 'Returns a person' })
  @ApiParam({ description: 'People ID', name: 'id' })
  @ApiBody({ type: PeopleDto })
  async findOnePeople(
    @Param('id') id: string,
    @Query() queryParametersOneDto: QueryParametersOneDto,
  ) {
    return await this.studioGhibliService.findOnePeople(
      id,
      queryParametersOneDto,
    );
  }

  @Roles(['admin', 'locations'])
  @Get('locations')
  @ApiOperation({ summary: 'Returns all locations' })
  @ApiBody({ type: [LocationDto] })
  async findAllLocations(
    @Query() queryParametersAllDto: QueryParametersAllDto,
  ) {
    return await this.studioGhibliService.findAllLocations(
      queryParametersAllDto,
    );
  }

  @Roles(['admin', 'locations'])
  @Get('locations/:id')
  @ApiOperation({ summary: 'Returns a location' })
  @ApiParam({ description: 'Location ID', name: 'id' })
  @ApiBody({ type: LocationDto })
  async findOneLocation(
    @Param('id') id: string,
    @Query() queryParametersOneDto: QueryParametersOneDto,
  ) {
    return await this.studioGhibliService.findOneLocation(
      id,
      queryParametersOneDto,
    );
  }

  @Roles(['admin', 'species'])
  @Get('species')
  @ApiOperation({ summary: 'Returns all species' })
  @ApiBody({ type: [SpeciesDto] })
  async findAllSpecies(@Query() queryParametersAllDto: QueryParametersAllDto) {
    return await this.studioGhibliService.findAllSpecies(queryParametersAllDto);
  }

  @Roles(['admin', 'species'])
  @Get('species/:id')
  @ApiOperation({ summary: 'Returns a species' })
  @ApiParam({ description: 'Species ID', name: 'id' })
  @ApiBody({ type: SpeciesDto })
  async findOneSpecies(
    @Param('id') id: string,
    @Query() queryParametersOneDto: QueryParametersOneDto,
  ) {
    return await this.studioGhibliService.findOneSpecies(
      id,
      queryParametersOneDto,
    );
  }

  @Roles(['admin', 'vehicles'])
  @Get('vehicles')
  @ApiOperation({ summary: 'Returns all vehicles' })
  @ApiBody({ type: [VehicleDto] })
  async findAllVehicles(@Query() queryParametersAllDto: QueryParametersAllDto) {
    return await this.studioGhibliService.findAllVehicles(
      queryParametersAllDto,
    );
  }

  @Roles(['admin', 'vehicles'])
  @Get('vehicles/:id')
  @ApiParam({ description: 'Vehicle ID', name: 'id' })
  @ApiOperation({ summary: 'Returns a vehicle' })
  @ApiBody({ type: VehicleDto })
  async findOneVehicle(
    @Param('id') id: string,
    @Query() queryParametersOneDto: QueryParametersOneDto,
  ) {
    return await this.studioGhibliService.findOneVehicle(
      id,
      queryParametersOneDto,
    );
  }
}
