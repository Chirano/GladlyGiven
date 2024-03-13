import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReviewServiceProviderComponent } from './view-review-service-provider.component';

describe('ViewReviewServiceProviderComponent', () => {
  let component: ViewReviewServiceProviderComponent;
  let fixture: ComponentFixture<ViewReviewServiceProviderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewReviewServiceProviderComponent]
    });
    fixture = TestBed.createComponent(ViewReviewServiceProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
