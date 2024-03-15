import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderDetailsSimpleComponent } from './service-provider-details-simple.component';

describe('ServiceProviderDetailsSimpleComponent', () => {
  let component: ServiceProviderDetailsSimpleComponent;
  let fixture: ComponentFixture<ServiceProviderDetailsSimpleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceProviderDetailsSimpleComponent]
    });
    fixture = TestBed.createComponent(ServiceProviderDetailsSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
