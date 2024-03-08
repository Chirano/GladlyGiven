import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRefugeeComponent } from './view-refugee.component';

describe('ViewRefugeeComponent', () => {
  let component: ViewRefugeeComponent;
  let fixture: ComponentFixture<ViewRefugeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewRefugeeComponent]
    });
    fixture = TestBed.createComponent(ViewRefugeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
