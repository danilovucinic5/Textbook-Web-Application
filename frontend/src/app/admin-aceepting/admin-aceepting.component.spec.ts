import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAceeptingComponent } from './admin-aceepting.component';

describe('AdminAceeptingComponent', () => {
  let component: AdminAceeptingComponent;
  let fixture: ComponentFixture<AdminAceeptingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAceeptingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAceeptingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
