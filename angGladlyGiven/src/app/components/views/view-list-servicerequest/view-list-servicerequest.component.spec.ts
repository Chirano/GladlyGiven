import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListServicerequestComponent } from './view-list-servicerequest.component';

describe('ViewListServicerequestComponent', () => {
  let component: ViewListServicerequestComponent;
  let fixture: ComponentFixture<ViewListServicerequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewListServicerequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewListServicerequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
