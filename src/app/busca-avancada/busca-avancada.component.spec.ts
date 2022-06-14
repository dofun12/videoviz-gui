import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuscaAvancadaComponent } from './busca-avancada.component';

describe('BuscaAvancadaComponent', () => {
  let component: BuscaAvancadaComponent;
  let fixture: ComponentFixture<BuscaAvancadaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscaAvancadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaAvancadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
