import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import {loginResponse} from '@app/_models'

@Injectable({ providedIn: 'root' })
export class AccountService {
    private loginSubject: BehaviorSubject<loginResponse>;
    public loginRes: Observable<loginResponse>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.loginSubject = new BehaviorSubject<loginResponse>(JSON.parse(localStorage.getItem('credentials')));
        this.loginRes = this.loginSubject.asObservable();
        
    }

    public get loginValue(): loginResponse {
        return this.loginSubject.value;
    }
    public get userValue(): User{
        return new User();
    }

    login(username, password) {
        return this.http.post<loginResponse>(`${environment.apiUrl}/hatcher/auth`, { username, password })
           .pipe(map(response => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                const loginResponse: loginResponse = response;
                localStorage.setItem('credenciais', atob(loginResponse.getToken));
                this.loginSubject.next(loginResponse);
                return loginResponse;
           }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('credenciais');
        this.loginSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/hatcher/listUsers`);
    }

    getById(id: bigint) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id, params) {
        return this.http.put<User>(`${environment.apiUrl}hatcher/update/${id}`, params)
            .pipe(map(x => { 
                 var updated :User = x;
                 return updated;
            }));
    }

    delete(id: bigint) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == JSON.parse(localStorage.getItem('credentials')).Id) {
                    this.logout();
                }
                return x;
            }));
    }
}
