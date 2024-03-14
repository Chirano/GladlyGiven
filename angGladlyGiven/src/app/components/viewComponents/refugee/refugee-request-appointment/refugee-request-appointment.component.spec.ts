import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefugeeRequestAppointmentComponent } from './refugee-request-appointment.component';

describe('RefugeeRequestAppointmentComponent', () => {
  let component: RefugeeRequestAppointmentComponent;
  let fixture: ComponentFixture<RefugeeRequestAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefugeeRequestAppointmentComponent]
    });
    fixture = TestBed.createComponent(RefugeeRequestAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
