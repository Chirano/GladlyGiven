import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalDetailsComponent } from './global-details.component';

describe('GlobalDetailsComponent', () => {
  let component: GlobalDetailsComponent;
  let fixture: ComponentFixture<GlobalDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalDetailsComponent]
    });
    fixture = TestBed.createComponent(GlobalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
