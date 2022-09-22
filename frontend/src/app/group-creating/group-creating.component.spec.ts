import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCreatingComponent } from './group-creating.component';

describe('GroupCreatingComponent', () => {
  let component: GroupCreatingComponent;
  let fixture: ComponentFixture<GroupCreatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupCreatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCreatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
