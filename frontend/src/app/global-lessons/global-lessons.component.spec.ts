import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalLessonsComponent } from './global-lessons.component';

describe('GlobalLessonsComponent', () => {
  let component: GlobalLessonsComponent;
  let fixture: ComponentFixture<GlobalLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalLessonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
