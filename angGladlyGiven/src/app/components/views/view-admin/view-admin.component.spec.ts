import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdminComponent } from './view-admin.component';

describe('ViewAdminComponent', () => {
  let component: ViewAdminComponent;
  let fixture: ComponentFixture<ViewAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAdminComponent]
    });
    fixture = TestBed.createComponent(ViewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
