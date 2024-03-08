import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewServiceProviderComponent } from './view-service-provider.component';

describe('ViewServiceProviderComponent', () => {
  let component: ViewServiceProviderComponent;
  let fixture: ComponentFixture<ViewServiceProviderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewServiceProviderComponent]
    });
    fixture = TestBed.createComponent(ViewServiceProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
