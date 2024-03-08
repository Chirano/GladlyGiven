import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSignUpFilterHelpIntentionComponent } from './view-sign-up-filter-help-intention.component';

describe('ViewSignUpFilterHelpIntentionComponent', () => {
  let component: ViewSignUpFilterHelpIntentionComponent;
  let fixture: ComponentFixture<ViewSignUpFilterHelpIntentionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSignUpFilterHelpIntentionComponent]
    });
    fixture = TestBed.createComponent(ViewSignUpFilterHelpIntentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
