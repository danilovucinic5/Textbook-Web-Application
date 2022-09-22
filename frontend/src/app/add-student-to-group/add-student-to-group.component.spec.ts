import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentToGroupComponent } from './add-student-to-group.component';

describe('AddStudentToGroupComponent', () => {
  let component: AddStudentToGroupComponent;
  let fixture: ComponentFixture<AddStudentToGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentToGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentToGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
