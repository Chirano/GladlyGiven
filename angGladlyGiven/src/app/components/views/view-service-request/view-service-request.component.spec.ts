import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewServiceRequestComponent } from './view-service-request.component';

describe('ViewServiceRequestComponent', () => {
  let component: ViewServiceRequestComponent;
  let fixture: ComponentFixture<ViewServiceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewServiceRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewServiceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
