import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSignUpFilterHelpTypeComponent } from './view-sign-up-filter-help-type.component';

describe('ViewSignUpFilterHelpTypeComponent', () => {
  let component: ViewSignUpFilterHelpTypeComponent;
  let fixture: ComponentFixture<ViewSignUpFilterHelpTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSignUpFilterHelpTypeComponent]
    });
    fixture = TestBed.createComponent(ViewSignUpFilterHelpTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
