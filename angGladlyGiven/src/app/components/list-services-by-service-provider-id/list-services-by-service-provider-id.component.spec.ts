import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListServicesByServiceProviderIdComponent } from './list-services-by-service-provider-id.component';

describe('ListServicesByServiceProviderIdComponent', () => {
  let component: ListServicesByServiceProviderIdComponent;
  let fixture: ComponentFixture<ListServicesByServiceProviderIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListServicesByServiceProviderIdComponent]
    });
    fixture = TestBed.createComponent(ListServicesByServiceProviderIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
