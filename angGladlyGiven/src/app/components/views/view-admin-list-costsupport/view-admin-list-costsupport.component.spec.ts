import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdminListCostsupportComponent } from './view-admin-list-costsupport.component';

describe('ViewAdminListCostsupportComponent', () => {
  let component: ViewAdminListCostsupportComponent;
  let fixture: ComponentFixture<ViewAdminListCostsupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAdminListCostsupportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAdminListCostsupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
