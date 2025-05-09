import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stamp } from '../../data/stamp';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StampService {

  constructor(private http: HttpClient) { }

  public stamp(): Observable<Stamp[]> {
    return this.http.post<Stamp[]>(environment.backendBaseUrl + 'stamp', {});
  }

  public getStamps(): Observable<Stamp[]> {
    return this.http.get<Stamp[]>(environment.backendBaseUrl + 'stamp');
  }

  public getWorkTime(): Observable<{ workTime: String }> {
    return this.http.get<{ workTime: String }>(environment.backendBaseUrl + 'stamp/worktime');
  }

  public getWorkTimeLeft(): Observable<{ workTimeLeft: String }> {
    return this.http.get<{ workTimeLeft: String }>(environment.backendBaseUrl + 'stamp/worktimeleft');
  } 

  public getStatus(): Observable<string> {
    return this.http.get(environment.backendBaseUrl + 'stamp/status', { responseType: 'text' });
  }
}
