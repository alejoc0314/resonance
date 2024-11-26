import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsDisplayComponent } from './artists-display.component';

describe('ArtistsDisplayComponent', () => {
  let component: ArtistsDisplayComponent;
  let fixture: ComponentFixture<ArtistsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistsDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
