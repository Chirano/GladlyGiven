import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListDonationsComponent } from './view-list-donations.component';

describe('ViewListDonationsComponent', () => {
  let component: ViewListDonationsComponent;
  let fixture: ComponentFixture<ViewListDonationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewListDonationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewListDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
