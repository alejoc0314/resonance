import { TestBed } from '@angular/core/testing';

import { SearchMusicService } from './search-music.service';

describe('SearchMusicService', () => {
  let service: SearchMusicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchMusicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
