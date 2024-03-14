import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefugeeSearchComponent } from './refugee-search.component';

describe('RefugeeSearchComponent', () => {
  let component: RefugeeSearchComponent;
  let fixture: ComponentFixture<RefugeeSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefugeeSearchComponent]
    });
    fixture = TestBed.createComponent(RefugeeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
