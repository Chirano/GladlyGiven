import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefugeeHomeComponent } from './refugee-home.component';

describe('RefugeeHomeComponent', () => {
  let component: RefugeeHomeComponent;
  let fixture: ComponentFixture<RefugeeHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefugeeHomeComponent]
    });
    fixture = TestBed.createComponent(RefugeeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
