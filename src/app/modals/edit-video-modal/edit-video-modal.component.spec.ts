import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditVideoModalComponent } from './edit-video-modal.component';

describe('EditVideoModalComponent', () => {
  let component: EditVideoModalComponent;
  let fixture: ComponentFixture<EditVideoModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVideoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVideoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
