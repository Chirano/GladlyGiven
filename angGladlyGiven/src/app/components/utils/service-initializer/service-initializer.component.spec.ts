import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceInitializerComponent } from './service-initializer.component';

describe('ServiceInitializerComponent', () => {
  let component: ServiceInitializerComponent;
  let fixture: ComponentFixture<ServiceInitializerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceInitializerComponent]
    });
    fixture = TestBed.createComponent(ServiceInitializerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
