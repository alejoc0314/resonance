import { TestBed } from '@angular/core/testing';

import { LoadSpotifyService } from './load-spotify.service';

describe('LoadSpotifyService', () => {
  let service: LoadSpotifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadSpotifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
