import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSignUpDonorComponent } from './view-sign-up-donor.component';

describe('ViewSignUpDonorComponent', () => {
  let component: ViewSignUpDonorComponent;
  let fixture: ComponentFixture<ViewSignUpDonorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSignUpDonorComponent]
    });
    fixture = TestBed.createComponent(ViewSignUpDonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
