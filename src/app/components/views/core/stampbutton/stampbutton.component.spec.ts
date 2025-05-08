import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StampbuttonComponent } from './stampbutton.component';

describe('StampbuttonComponent', () => {
  let component: StampbuttonComponent;
  let fixture: ComponentFixture<StampbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StampbuttonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StampbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
