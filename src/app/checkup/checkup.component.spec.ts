import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CheckupComponent } from './checkup.component';

describe('CheckupComponent', () => {
  let component: CheckupComponent;
  let fixture: ComponentFixture<CheckupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
