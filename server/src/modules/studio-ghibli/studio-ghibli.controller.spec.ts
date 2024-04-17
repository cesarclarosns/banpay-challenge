import { TestBed } from '@automock/jest';

import { StudioGhibliController } from './studio-ghibli.controller';

describe('StudioGhibliController', () => {
  let studioGhibliController: StudioGhibliController;

  beforeEach(async () => {
    const { unit } = TestBed.create(StudioGhibliController).compile();
    studioGhibliController = unit;
  });

  it('should be defined', () => {
    expect(studioGhibliController).toBeDefined();
  });

  describe('findAllFilms', () => {});
  describe('findOneFilm', () => {});
  describe('findAllPeople', () => {});
  describe('findOnePeople', () => {});
  describe('findAllLocations', () => {});
  describe('findOneLocation', () => {});
  describe('findAllSpecies', () => {});
  describe('findOneSpecies', () => {});
  describe('findAllVehicles', () => {});
  describe('findOneVehicles', () => {});
});
