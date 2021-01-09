import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Application } from '@app/_models';
import { User } from '@app/_models';
import { UserForRegistration } from '@app/_models/userForRegistration';

@Injectable({ providedIn: 'root' })
export class UserService {

  token: string;

  constructor(private http: HttpClient) {
    let obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
  }

  requestRegister(request: Application): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/request`, request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }

  registerDepartmentUsers(request: UserForRegistration[]): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/supervisior/application`, request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }

  getUserForUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/admin/getuserforregister`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }

  deleteUserForRegister(user: UserForRegistration): Observable<UserForRegistration> {
    return this.http.post<UserForRegistration>(`${environment.apiUrl}/admin/deleteReg`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }

  getDepartment(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/departments`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });

  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/admin/getusers`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }

  activateUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/admin/activate`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }

  createUser(user: User): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/admin/register`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }

  deleteUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/admin/delete`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }

  updateUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/admin/modify`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }

  getUserById(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/admin/getuser`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }

  getOnlyUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/subsistent/getusers`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }


  getOnlyApplication(request: string): Observable<Application[]> {
    return this.http.get<Application[]>(`${environment.apiUrl}/subsistent/getapplication/`+request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }


}
