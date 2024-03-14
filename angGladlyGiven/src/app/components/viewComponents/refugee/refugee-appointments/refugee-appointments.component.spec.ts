import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefugeeAppointmentsComponent } from './refugee-appointments.component';

describe('RefugeeAppointmentsComponent', () => {
  let component: RefugeeAppointmentsComponent;
  let fixture: ComponentFixture<RefugeeAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefugeeAppointmentsComponent]
    });
    fixture = TestBed.createComponent(RefugeeAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
