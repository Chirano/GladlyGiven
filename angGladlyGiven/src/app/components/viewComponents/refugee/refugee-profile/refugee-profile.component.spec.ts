import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefugeeProfileComponent } from './refugee-profile.component';

describe('RefugeeProfileComponent', () => {
  let component: RefugeeProfileComponent;
  let fixture: ComponentFixture<RefugeeProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefugeeProfileComponent]
    });
    fixture = TestBed.createComponent(RefugeeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
