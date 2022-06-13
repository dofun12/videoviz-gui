import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VideoSessionComponent } from './video-session.component';

describe('VideoSessionComponent', () => {
  let component: VideoSessionComponent;
  let fixture: ComponentFixture<VideoSessionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
