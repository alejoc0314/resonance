import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterPlayingBarComponent } from './footer-playing-bar.component';

describe('FooterPlayingBarComponent', () => {
  let component: FooterPlayingBarComponent;
  let fixture: ComponentFixture<FooterPlayingBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterPlayingBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterPlayingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
