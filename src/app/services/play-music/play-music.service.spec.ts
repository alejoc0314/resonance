import { TestBed } from '@angular/core/testing';

import { PlayMusicService } from './play-music.service';

describe('PlayMusicService', () => {
  let service: PlayMusicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayMusicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
