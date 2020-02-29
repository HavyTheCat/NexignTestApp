import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAvailabilityComponent } from './non-availability.component';

describe('NonAvailabilityComponent', () => {
  let component: NonAvailabilityComponent;
  let fixture: ComponentFixture<NonAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
