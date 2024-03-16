import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentRequestComponent } from './appointment-request.component';

describe('AppointmentRequestComponent', () => {
  let component: AppointmentRequestComponent;
  let fixture: ComponentFixture<AppointmentRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentRequestComponent]
    });
    fixture = TestBed.createComponent(AppointmentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
