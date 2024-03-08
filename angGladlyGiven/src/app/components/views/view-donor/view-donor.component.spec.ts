import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDonorComponent } from './view-donor.component';

describe('ViewDonorComponent', () => {
  let component: ViewDonorComponent;
  let fixture: ComponentFixture<ViewDonorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDonorComponent]
    });
    fixture = TestBed.createComponent(ViewDonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
