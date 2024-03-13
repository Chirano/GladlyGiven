import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewServiceProviderServicesComponent } from './view-service-provider-services.component';

describe('ViewServiceProviderServicesComponent', () => {
  let component: ViewServiceProviderServicesComponent;
  let fixture: ComponentFixture<ViewServiceProviderServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewServiceProviderServicesComponent]
    });
    fixture = TestBed.createComponent(ViewServiceProviderServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
