import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaAvancadaNovoComponent } from './busca-avancada-novo.component';

describe('BuscaAvancadaNovoComponent', () => {
  let component: BuscaAvancadaNovoComponent;
  let fixture: ComponentFixture<BuscaAvancadaNovoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscaAvancadaNovoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaAvancadaNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
