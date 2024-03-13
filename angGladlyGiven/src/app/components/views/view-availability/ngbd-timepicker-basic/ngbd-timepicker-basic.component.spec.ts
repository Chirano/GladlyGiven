import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbdTimepickerBasicComponent } from './ngbd-timepicker-basic.component';

describe('NgbdTimepickerBasicComponent', () => {
  let component: NgbdTimepickerBasicComponent;
  let fixture: ComponentFixture<NgbdTimepickerBasicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgbdTimepickerBasicComponent]
    });
    fixture = TestBed.createComponent(NgbdTimepickerBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
