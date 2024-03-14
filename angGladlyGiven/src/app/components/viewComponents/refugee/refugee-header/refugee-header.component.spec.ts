import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefugeeHeaderComponent } from './refugee-header.component';

describe('RefugeeHeaderComponent', () => {
  let component: RefugeeHeaderComponent;
  let fixture: ComponentFixture<RefugeeHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefugeeHeaderComponent]
    });
    fixture = TestBed.createComponent(RefugeeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
