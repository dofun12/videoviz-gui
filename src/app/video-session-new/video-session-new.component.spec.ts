import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSessionNewComponent } from './video-session-new.component';

describe('VideoSessionNewComponent', () => {
  let component: VideoSessionNewComponent;
  let fixture: ComponentFixture<VideoSessionNewComponent>;

  beforeEach(async(() => {
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
