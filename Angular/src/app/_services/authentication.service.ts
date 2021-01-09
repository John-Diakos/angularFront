import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { Jwt } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
      let user = new User();
      user.username = username;
      user.password = password;
        return this.http.post<User>(`${environment.apiUrl}/authenticate`,user)
            .pipe(map(user => {
              console.log("user");
              console.log(user);
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    register(
      firstName: string, 
      lastName: string,
      email: string,
      username: string, 
      password: string, 
      age:number,
      birthDay: string,
      role: string,  
      department: string
      ){
      let user = new User();
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.username = username;
      user.password = password;
      user.age = age;
      user.birthDay = birthDay;
      user.role = role;
      user.department = department;
      
      console.log(user);
      return this.http.post<User>(`${environment.apiUrl}/register`,user);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
