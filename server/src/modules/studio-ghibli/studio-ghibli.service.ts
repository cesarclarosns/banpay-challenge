import { Injectable } from '@nestjs/common';

import { FilmDto } from './dto/film.dto';
import { LocationDto } from './dto/location.dto';
import { PeopleDto } from './dto/people.dto';
import { QueryParametersAllDto } from './dto/query-parameters-all.dto';
import { QueryParametersOneDto } from './dto/query-parameters-one.dto';
import { SpeciesDto } from './dto/species.dto';
import { VehicleDto } from './dto/vehicle.dto';
import { api } from './libs/api';

@Injectable()
export class StudioGhibliService {
  async findAllFilms({
    fields,
    limit,
  }: QueryParametersAllDto): Promise<FilmDto[]> {
    const response = await api.get('films', {
      params: {
        ...(fields && { fields: fields.join(',') }),
        ...(limit && { limit }),
      },
    });
    return response.data;
  }

  async findOneFilm(
    id: string,
    { fields }: QueryParametersOneDto,
  ): Promise<FilmDto> {
    const response = await api.get(`films/${id}`, {
      params: { ...(fields && { fields: fields.join(',') }) },
    });
    return response.data;
  }

  async findAllPeople({
    fields,
    limit,
  }: QueryParametersAllDto): Promise<PeopleDto[]> {
    const response = await api.get('people', {
      params: {
        ...(fields && { fields: fields.join(',') }),
        ...(limit && { limit }),
      },
    });
    return response.data;
  }

  async findOnePeople(
    id: string,
    { fields }: QueryParametersOneDto,
  ): Promise<PeopleDto> {
    const response = await api.get(`people/${id}`, {
      params: { ...(fields && { fields: fields.join(',') }) },
    });
    return response.data;
  }

  async findAllLocations({
    fields,
    limit,
  }: QueryParametersAllDto): Promise<LocationDto[]> {
    const response = await api.get('locations', {
      params: {
        ...(fields && { fields: fields.join(',') }),
        ...(limit && { limit }),
      },
    });
    return response.data;
  }

  async findOneLocation(
    id: string,
    { fields }: QueryParametersOneDto,
  ): Promise<LocationDto> {
    const response = await api.get(`locations/${id}`, {
      params: { ...(fields && { fields: fields.join(',') }) },
    });
    return response.data;
  }

  async findAllSpecies({
    fields,
    limit,
  }: QueryParametersAllDto): Promise<SpeciesDto[]> {
    const response = await api.get('species', {
      params: {
        ...(fields && { fields: fields.join(',') }),
        ...(limit && { limit }),
      },
    });
    return response.data;
  }

  async findOneSpecies(
    id: string,
    { fields }: QueryParametersOneDto,
  ): Promise<SpeciesDto> {
    const response = await api.get(`species/${id}`, {
      params: { ...(fields && { fields: fields.join(',') }) },
    });
    return response.data;
  }

  async findAllVehicles({
    fields,
    limit,
  }: QueryParametersAllDto): Promise<VehicleDto[]> {
    const response = await api.get('vehicles', {
      params: {
        ...(fields && { fields: fields.join(',') }),
        ...(limit && { limit }),
      },
    });
    return response.data;
  }

  async findOneVehicle(
    id: string,
    { fields }: QueryParametersOneDto,
  ): Promise<VehicleDto> {
    const response = await api.get(`vehicles/${id}`, {
      params: { ...(fields && { fields: fields.join(',') }) },
    });
    return response.data;
  }
}
