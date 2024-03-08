import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSignUpServiceProviderComponent } from './view-sign-up-service-provider.component';

describe('ViewSignUpServiceProviderComponent', () => {
  let component: ViewSignUpServiceProviderComponent;
  let fixture: ComponentFixture<ViewSignUpServiceProviderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSignUpServiceProviderComponent]
    });
    fixture = TestBed.createComponent(ViewSignUpServiceProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
