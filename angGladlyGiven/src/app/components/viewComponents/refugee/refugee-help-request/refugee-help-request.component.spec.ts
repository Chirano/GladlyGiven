import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefugeeHelpRequestComponent } from './refugee-help-request.component';

describe('RefugeeHelpRequestComponent', () => {
  let component: RefugeeHelpRequestComponent;
  let fixture: ComponentFixture<RefugeeHelpRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefugeeHelpRequestComponent]
    });
    fixture = TestBed.createComponent(RefugeeHelpRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
