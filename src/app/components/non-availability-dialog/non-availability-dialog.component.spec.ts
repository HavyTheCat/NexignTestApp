import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAvailabilityDialogComponent } from './non-availability-dialog.component';

describe('NonAvailabilityDialogComponent', () => {
  let component: NonAvailabilityDialogComponent;
  let fixture: ComponentFixture<NonAvailabilityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonAvailabilityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAvailabilityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
