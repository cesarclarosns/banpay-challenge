import { Injectable } from '@nestjs/common';

import { QueryParametersAllDto } from './dto/query-parameters-all.dto';
import { QueryParametersOneDto } from './dto/query-parameters-one.dto';
import { api } from './libs/api';

@Injectable()
export class StudioGhibliService {
  async findAllFilms({ fields, limit }: QueryParametersAllDto) {
    const response = await api.get('films', {
      params: {
        ...(fields && { fields: fields.join(',') }),
        ...(limit && { limit }),
      },
    });
    return response.data;
  }

  async findOneFilm(id: string, { fields }: QueryParametersOneDto) {
    const response = await api.get(`films/${id}`, {
      params: { ...(fields && { fields: fields.join(',') }) },
    });
    return response.data;
  }

  async findAllPeople({ fields, limit }: QueryParametersAllDto) {
    const response = await api.get('people', {
      params: {
        ...(fields && { fields: fields.join(',') }),
        ...(limit && { limit }),
      },
    });
    return response.data;
  }

  async findOnePeople(id: string, { fields }: QueryParametersOneDto) {
    const response = await api.get(`people/${id}`, {
      params: { ...(fields && { fields: fields.join(',') }) },
    });
    return response.data;
  }

  async findAllLocations({ fields, limit }: QueryParametersAllDto) {
    const response = await api.get('locations', {
      params: {
        ...(fields && { fields: fields.join(',') }),
        ...(limit && { limit }),
      },
    });
    return response.data;
  }

  async findOneLocation(id: string, { fields }: QueryParametersOneDto) {
    const response = await api.get(`locations/${id}`, {
      params: { ...(fields && { fields: fields.join(',') }) },
    });
    return response.data;
  }

  async findAllSpecies({ fields, limit }: QueryParametersAllDto) {
    const response = await api.get('species', {
      params: {
        ...(fields && { fields: fields.join(',') }),
        ...(limit && { limit }),
      },
    });
    return response.data;
  }

  async findOneSpecies(id: string, { fields }: QueryParametersOneDto) {
    const response = await api.get(`species/${id}`, {
      params: { ...(fields && { fields: fields.join(',') }) },
    });
    return response.data;
  }

  async findAllVehicles({ fields, limit }: QueryParametersAllDto) {
    const response = await api.get('vehicles', {
      params: {
        ...(fields && { fields: fields.join(',') }),
        ...(limit && { limit }),
      },
    });
    return response.data;
  }

  async findOneVehicle(id: string, { fields }: QueryParametersOneDto) {
    const response = await api.get(`vehicles/${id}`, {
      params: { ...(fields && { fields: fields.join(',') }) },
    });
    return response.data;
  }
}
