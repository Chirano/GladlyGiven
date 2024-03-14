import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefugeeSearchbarComponent } from './refugee-searchbar.component';

describe('RefugeeSearchbarComponent', () => {
  let component: RefugeeSearchbarComponent;
  let fixture: ComponentFixture<RefugeeSearchbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefugeeSearchbarComponent]
    });
    fixture = TestBed.createComponent(RefugeeSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
