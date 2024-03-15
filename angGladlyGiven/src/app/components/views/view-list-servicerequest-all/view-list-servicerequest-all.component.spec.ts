import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListServicerequestAllComponent } from './view-list-servicerequest-all.component';

describe('ViewListServicerequestAllComponent', () => {
  let component: ViewListServicerequestAllComponent;
  let fixture: ComponentFixture<ViewListServicerequestAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewListServicerequestAllComponent]
    });
    fixture = TestBed.createComponent(ViewListServicerequestAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
