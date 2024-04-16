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
});
