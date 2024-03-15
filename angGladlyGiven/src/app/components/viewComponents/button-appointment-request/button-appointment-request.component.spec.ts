import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAppointmentRequestComponent } from './button-appointment-request.component';

describe('ButtonAppointmentRequestComponent', () => {
  let component: ButtonAppointmentRequestComponent;
  let fixture: ComponentFixture<ButtonAppointmentRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonAppointmentRequestComponent]
    });
    fixture = TestBed.createComponent(ButtonAppointmentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
