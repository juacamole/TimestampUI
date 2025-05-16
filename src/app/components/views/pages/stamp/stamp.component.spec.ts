import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { StampComponent } from './stamp.component';
import { StampService } from '../../../services/stamp.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { CommonModule } from '@angular/common';
import { Stamp } from '../../../../data/stamp';
import { NavigationService } from '../../../../services/navigation.service';

describe('StampComponent', () => {
  let component: StampComponent;
  let fixture: ComponentFixture<StampComponent>;
  let stampServiceSpy: Spy<StampService>;
  let navigationServiceSpy: jasmine.SpyObj<NavigationService>;

  const mockUser = {
    id: 1,
    username: "testuser",
    firstname: "Test",
    lastname: "User",
    workhours: 8,
    workminutes: 0
  };

  const fakeStamps: Stamp[] = [
    {
      id: 1,
      time: '09:00:00',
      user: mockUser
    },
    {
      id: 2,
      time: '12:00:00',
      user: mockUser
    },
    {
      id: 3,
      time: '13:00:00',
      user: mockUser
    },
    {
      id: 4,
      time: '17:00:00',
      user: mockUser
    }
  ];

  beforeEach(async () => {
    navigationServiceSpy = jasmine.createSpyObj('NavigationService', ['reload']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        StampComponent
      ],
      providers: [
        {
          provide: StampService,
          useValue: createSpyFromClass(StampService)
        },
        {
          provide: NavigationService,
          useValue: navigationServiceSpy
        }
      ]
    }).compileComponents();

    stampServiceSpy = TestBed.inject<any>(StampService);
    
    stampServiceSpy.getStamps.and.nextWith(fakeStamps);
    stampServiceSpy.getWorkTime.and.nextWith({ workTime: '08:00:00' });
    stampServiceSpy.getWorkTimeLeft.and.nextWith({ workTimeLeft: '01:00:00' });
    stampServiceSpy.getStatus.and.nextWith('IN');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StampComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load stamps on init', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    expect(component.stamps).toHaveSize(fakeStamps.length);
    expect(stampServiceSpy.getStamps.calls.count()).toBe(1);
    
    expect(component.oddStamps).toEqual([
      '17:00:00',
      '12:00:00'
    ]);

    expect(component.evenStamps).toEqual([
      '13:00:00',
      '09:00:00'
    ]);
  }));

  it('should load work time on init', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    expect(component.workTime).toBe('08:00:00');
    expect(stampServiceSpy.getWorkTime.calls.count()).toBe(1);
  }));

  it('should load work time left on init', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    expect(component.workTimeLeft).toBe('01:00:00');
    expect(stampServiceSpy.getWorkTimeLeft.calls.count()).toBe(1);
  }));

  it('should load status on init', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    expect(component.status).toBe('IN');
    expect(stampServiceSpy.getStatus.calls.count()).toBe(1);
  }));

  it('should create new stamp', fakeAsync(() => {
    stampServiceSpy.stamp.and.nextWith(fakeStamps);
    component.stamp();
    tick();

    expect(stampServiceSpy.stamp.calls.count()).toBe(1);
    expect(navigationServiceSpy.reload).toHaveBeenCalled();
  }));
});
