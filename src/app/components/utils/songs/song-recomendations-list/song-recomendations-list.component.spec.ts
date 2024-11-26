import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongRecomendationsListComponent } from './song-recomendations-list.component';

describe('SongRecomendationsListComponent', () => {
  let component: SongRecomendationsListComponent;
  let fixture: ComponentFixture<SongRecomendationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongRecomendationsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongRecomendationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
