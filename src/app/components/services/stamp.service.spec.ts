import { TestBed } from '@angular/core/testing';
import { StampService } from './stamp.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { HttpClient } from '@angular/common/http';
import { Stamp } from '../../data/stamp';

describe('StampService', () => {
  let service: StampService;
  let httpSpy: Spy<HttpClient>;

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
      time: '17:00:00',
      user: mockUser
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: createSpyFromClass(HttpClient)
        }
      ]
    });
    service = TestBed.inject(StampService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get list of stamps', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeStamps);

    service.getStamps().subscribe({
      next: stamps => {
        expect(stamps).toHaveSize(fakeStamps.length);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should create new stamp', (done: DoneFn) => {
    httpSpy.post.and.nextWith(fakeStamps);

    service.stamp().subscribe({
      next: stamps => {
        expect(stamps).toHaveSize(fakeStamps.length);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should get work time', (done: DoneFn) => {
    const workTime = { workTime: '08:00:00' };
    httpSpy.get.and.nextWith(workTime);

    service.getWorkTime().subscribe({
      next: response => {
        expect(response.workTime).toBe('08:00:00');
        done();
      },
      error: done.fail
    });
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should get work time left', (done: DoneFn) => {
    const workTimeLeft = { workTimeLeft: '01:00:00' };
    httpSpy.get.and.nextWith(workTimeLeft);

    service.getWorkTimeLeft().subscribe({
      next: response => {
        expect(response.workTimeLeft).toBe('01:00:00');
        done();
      },
      error: done.fail
    });
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should get status', (done: DoneFn) => {
    const status = 'IN';
    httpSpy.get.and.nextWith(status);

    service.getStatus().subscribe({
      next: response => {
        expect(response).toBe('IN');
        done();
      },
      error: done.fail
    });
    expect(httpSpy.get.calls.count()).toBe(1);
  });
});
