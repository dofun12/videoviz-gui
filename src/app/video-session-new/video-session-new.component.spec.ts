import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VideoSessionNewComponent } from './video-session-new.component';

describe('VideoSessionNewComponent', () => {
  let component: VideoSessionNewComponent;
  let fixture: ComponentFixture<VideoSessionNewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoSessionNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoSessionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
