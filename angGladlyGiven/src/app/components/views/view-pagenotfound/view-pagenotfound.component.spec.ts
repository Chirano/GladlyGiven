import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPagenotfoundComponent } from './view-pagenotfound.component';

describe('ViewPagenotfoundComponent', () => {
  let component: ViewPagenotfoundComponent;
  let fixture: ComponentFixture<ViewPagenotfoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPagenotfoundComponent]
    });
    fixture = TestBed.createComponent(ViewPagenotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
