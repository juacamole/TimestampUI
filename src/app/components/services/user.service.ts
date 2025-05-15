import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../data/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getUser(): Observable<User[]> {
    return this.http.get<User[]>(environment.backendBaseUrl + 'user');
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(environment.backendBaseUrl + 'user', user);
  }

  public updateUser(user: User): Observable<User> {
    const { id, ...userWithoutId } = user;
    return this.http.put<User>(environment.backendBaseUrl + 'user/' + id, userWithoutId);
  }

  public deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(environment.backendBaseUrl + 'user/' + id);
  }
}
