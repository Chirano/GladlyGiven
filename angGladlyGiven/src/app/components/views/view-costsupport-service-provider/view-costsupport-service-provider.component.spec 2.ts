import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCostsupportServiceProviderComponent } from './view-costsupport-service-provider.component';

describe('ViewCostsupportServiceProviderComponent', () => {
  let component: ViewCostsupportServiceProviderComponent;
  let fixture: ComponentFixture<ViewCostsupportServiceProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCostsupportServiceProviderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewCostsupportServiceProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
