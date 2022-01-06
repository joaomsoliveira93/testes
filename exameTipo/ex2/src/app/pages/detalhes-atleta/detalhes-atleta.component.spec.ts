import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesAtletaComponent } from './detalhes-atleta.component';

describe('DetalhesAtletaComponent', () => {
  let component: DetalhesAtletaComponent;
  let fixture: ComponentFixture<DetalhesAtletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesAtletaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesAtletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
