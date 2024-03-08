import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSignUpRefugeeComponent } from './view-sign-up-refugee.component';

describe('ViewSignUpRefugeeComponent', () => {
  let component: ViewSignUpRefugeeComponent;
  let fixture: ComponentFixture<ViewSignUpRefugeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSignUpRefugeeComponent]
    });
    fixture = TestBed.createComponent(ViewSignUpRefugeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
