import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagerConditionerComponent } from './pager-conditioner.component';

describe('PagerConditionerComponent', () => {
  let component: PagerConditionerComponent;
  let fixture: ComponentFixture<PagerConditionerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagerConditionerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagerConditionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
