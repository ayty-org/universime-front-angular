import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User, userDTO, loginResponse } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private loginSubject: BehaviorSubject<loginResponse>;
    public loginRes: Observable<loginResponse>;
    public user: Observable<User>;
    public userSubject: BehaviorSubject<User>;
    private header:HttpHeaders;

    constructor(
        private router: Router,
        private http: HttpClient,
    ) 
    
    {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('credenciais')));
        //this.loginRes = this.loginSubject.asObservable();
        this.user = this.userSubject.asObservable();
        
    }

   
    public get userValue(): User{
        return this.userSubject.value;
    }
    public get loginValue(): loginResponse{
        return this.loginSubject.value;
    }

    login(login, password) {
        return this.http.post<loginResponse>(`${environment.apiUrl}/hatcher/auth`, { login, password })
           .pipe(map(response => {
                this.header = new HttpHeaders({Authorization: `Bearer ${response.token}`} )   
            // store user details and jwt token in local storage to keep user logged in between page refreshe
                localStorage.setItem('credenciais',JSON.stringify(JSON.parse(window.atob(response.token.split(".")[1]))));
                this.loginSubject.next(response);
                return response;
           }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('credenciais');
        this.loginSubject.next(null);
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post<User>(`${environment.apiUrl}/users/register`, user,{headers:this.header});
    }

    getAll() {
        return this.http.get<userDTO[]>(`${environment.apiUrl}/hatcher/listUsers`,{headers:this.header})
        
    }

    getById(id: bigint) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`,{headers:this.header});
    }

    update(id, params) {
        return this.http.put<User>(`${environment.apiUrl}hatcher/update/${id}`, params,{headers:this.header})
            .pipe(map(x => { 
                 var updated :User = x;
                 return updated;
            }));
    }

    delete(id: bigint) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`,{headers:this.header})
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == JSON.parse(localStorage.getItem('credentials')).Id) {
                    this.logout();
                }
                return x;
            }));
    }
}
