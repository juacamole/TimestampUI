import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofileDropdownComponent } from './userprofile-dropdown.component';

describe('UserprofileDropdownComponent', () => {
  let component: UserprofileDropdownComponent;
  let fixture: ComponentFixture<UserprofileDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserprofileDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserprofileDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
