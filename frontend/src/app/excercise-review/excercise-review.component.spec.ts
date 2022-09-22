import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcerciseReviewComponent } from './excercise-review.component';

describe('ExcerciseReviewComponent', () => {
  let component: ExcerciseReviewComponent;
  let fixture: ComponentFixture<ExcerciseReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcerciseReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcerciseReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
