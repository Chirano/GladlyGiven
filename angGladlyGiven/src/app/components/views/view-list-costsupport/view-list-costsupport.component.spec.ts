import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListCostsupportComponent } from './view-list-costsupport.component';

describe('ViewListCostsupportComponent', () => {
  let component: ViewListCostsupportComponent;
  let fixture: ComponentFixture<ViewListCostsupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewListCostsupportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewListCostsupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
