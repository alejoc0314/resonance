import { TestBed } from '@angular/core/testing';

import { SongStateService } from './song-state.service';

describe('SongStateService', () => {
  let service: SongStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
