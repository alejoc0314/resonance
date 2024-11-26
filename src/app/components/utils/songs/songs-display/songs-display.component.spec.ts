import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsDisplayComponent } from './songs-display.component';

describe('SongsDisplayComponent', () => {
  let component: SongsDisplayComponent;
  let fixture: ComponentFixture<SongsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongsDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
