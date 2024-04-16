import { TestBed } from '@automock/jest';

import { StudioGhibliService } from './studio-ghibli.service';

describe('StudioGhibliService', () => {
  let studioGhibliService: StudioGhibliService;

  beforeEach(async () => {
    const { unit } = TestBed.create(StudioGhibliService).compile();
    studioGhibliService = unit;
  });

  it('should be defined', () => {
    expect(studioGhibliService).toBeDefined();
  });
});
