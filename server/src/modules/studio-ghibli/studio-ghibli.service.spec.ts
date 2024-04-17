import { TestBed } from '@automock/jest';

import { FilmDto } from './dto/film.dto';
import { LocationDto } from './dto/location.dto';
import { PeopleDto } from './dto/people.dto';
import { SpeciesDto } from './dto/species.dto';
import { VehicleDto } from './dto/vehicle.dto';
import { api } from './libs/api';
import { StudioGhibliService } from './studio-ghibli.service';

describe('StudioGhibliService', () => {
  let studioGhibliService: StudioGhibliService;

  const _film = new FilmDto({ id: 'film' });
  const _people = new PeopleDto({ id: 'people' });
  const _location = new LocationDto({ id: 'location' });
  const _species = new SpeciesDto({ id: 'species' });
  const _vehicle = new VehicleDto({ id: 'vehicle' });

  beforeEach(async () => {
    const { unit } = TestBed.create(StudioGhibliService).compile();
    studioGhibliService = unit;
  });

  it('should be defined', () => {
    expect(studioGhibliService).toBeDefined();
  });

  describe('findAllFilms', () => {
    it('should return all films', async () => {
      const spy = jest.spyOn(api, 'get');
      spy.mockResolvedValueOnce({ data: [_film] });

      const films = await studioGhibliService.findAllFilms({});

      expect(films[0]).toMatchObject(_film);
      expect(films.length).toBe(1);
    });
  });

  describe('findOneFilm', () => {
    it('should return one film', () => {
      const spy = jest.spyOn(api, 'get');
      spy.mockResolvedValueOnce({ data: _film });

      expect(studioGhibliService.findOneFilm('id', {})).resolves.toMatchObject(
        _film,
      );
    });
  });

  describe('findAllPeople', () => {
    it('should return all people', async () => {
      const spy = jest.spyOn(api, 'get');
      spy.mockResolvedValueOnce({ data: [_people] });

      const people = await studioGhibliService.findAllPeople({});

      expect(people[0]).toMatchObject(_people);
      expect(people.length).toBe(1);
    });
  });

  describe('findOnePeople', () => {
    it('should return one people', () => {
      const spy = jest.spyOn(api, 'get');
      spy.mockResolvedValueOnce({ data: _people });

      expect(
        studioGhibliService.findOnePeople('id', {}),
      ).resolves.toMatchObject(_people);
    });
  });

  describe('findAllLocations', () => {
    it('should return all locations', async () => {
      const spy = jest.spyOn(api, 'get');
      spy.mockResolvedValueOnce({ data: [_location] });

      const locations = await studioGhibliService.findAllLocations({});

      expect(locations[0]).toMatchObject(_location);
      expect(locations.length).toBe(1);
    });
  });

  describe('findOneLocation', () => {
    it('should return one location', () => {
      const spy = jest.spyOn(api, 'get');
      spy.mockResolvedValueOnce({ data: _location });

      expect(
        studioGhibliService.findOneLocation('id', {}),
      ).resolves.toMatchObject(_location);
    });
  });

  describe('findAllSpecies', () => {
    it('should return all species', async () => {
      const spy = jest.spyOn(api, 'get');
      spy.mockResolvedValueOnce({ data: [_species] });

      const species = await studioGhibliService.findAllSpecies({});

      expect(species[0]).toMatchObject(_species);
      expect(species.length).toBe(1);
    });
  });

  describe('findOneSpecies', () => {
    it('should return one species', () => {
      const spy = jest.spyOn(api, 'get');
      spy.mockResolvedValueOnce({ data: _species });

      expect(
        studioGhibliService.findOneSpecies('id', {}),
      ).resolves.toMatchObject(_species);
    });
  });

  describe('findAllVehicles', () => {
    it('should return all vehicles', async () => {
      const spy = jest.spyOn(api, 'get');
      spy.mockResolvedValueOnce({ data: [_vehicle] });

      const vehicles = await studioGhibliService.findAllVehicles({});

      expect(vehicles[0]).toMatchObject(_vehicle);
      expect(vehicles.length).toBe(1);
    });
  });

  describe('findOneVehicles', () => {
    it('should return one vehicle', () => {
      const spy = jest.spyOn(api, 'get');
      spy.mockResolvedValueOnce({ data: _vehicle });

      expect(
        studioGhibliService.findOneVehicle('id', {}),
      ).resolves.toMatchObject(_vehicle);
    });
  });
});
