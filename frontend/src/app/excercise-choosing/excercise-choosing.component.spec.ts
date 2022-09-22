import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcerciseChoosingComponent } from './excercise-choosing.component';

describe('ExcerciseChoosingComponent', () => {
  let component: ExcerciseChoosingComponent;
  let fixture: ComponentFixture<ExcerciseChoosingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcerciseChoosingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcerciseChoosingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
