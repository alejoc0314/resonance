import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsDisplayComponent } from './albums-display.component';

describe('AlbumsDisplayComponent', () => {
  let component: AlbumsDisplayComponent;
  let fixture: ComponentFixture<AlbumsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumsDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
