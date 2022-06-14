import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CheckLinksComponent } from './check-links.component';

describe('CheckLinksComponent', () => {
  let component: CheckLinksComponent;
  let fixture: ComponentFixture<CheckLinksComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
