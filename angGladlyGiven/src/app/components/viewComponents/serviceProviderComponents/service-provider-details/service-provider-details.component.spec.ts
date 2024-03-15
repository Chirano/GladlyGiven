import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderDetailsComponent } from './service-provider-details.component';

describe('ServiceProviderDetailsComponent', () => {
  let component: ServiceProviderDetailsComponent;
  let fixture: ComponentFixture<ServiceProviderDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceProviderDetailsComponent]
    });
    fixture = TestBed.createComponent(ServiceProviderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
