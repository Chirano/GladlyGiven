import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDonationListComponent } from './view-donation-list.component';

describe('ViewDonationListComponent', () => {
  let component: ViewDonationListComponent;
  let fixture: ComponentFixture<ViewDonationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDonationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewDonationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
