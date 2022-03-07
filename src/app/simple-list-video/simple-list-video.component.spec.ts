import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleListVideoComponent } from './simple-list-video.component';

describe('SimpleListVideoComponent', () => {
  let component: SimpleListVideoComponent;
  let fixture: ComponentFixture<SimpleListVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleListVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleListVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
