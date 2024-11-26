import { TestBed } from '@angular/core/testing';

import { PublicSongsService } from './public-songs.service';

describe('PublicSongsService', () => {
  let service: PublicSongsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicSongsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
