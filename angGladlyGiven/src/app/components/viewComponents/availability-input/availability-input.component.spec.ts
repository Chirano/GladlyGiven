import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityInputComponent } from './availability-input.component';

describe('AvailabilityInputComponent', () => {
  let component: AvailabilityInputComponent;
  let fixture: ComponentFixture<AvailabilityInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailabilityInputComponent]
    });
    fixture = TestBed.createComponent(AvailabilityInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
