import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User, userDTO, loginResponse, tokenUser, Pageable } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private loginSubject: BehaviorSubject<loginResponse>;
    public loginRes: Observable<loginResponse>;
    public user: Observable<tokenUser>;
    public userSubject: BehaviorSubject<tokenUser>;
    private header:HttpHeaders;

    constructor(
        private router: Router,
        private http: HttpClient,
    ) 
    
    {
        this.userSubject = new BehaviorSubject<tokenUser>(JSON.parse(localStorage.getItem('credenciais')));
        //this.loginRes = this.loginSubject.asObservable();
        this.user = this.userSubject.asObservable();
        this.loginSubject = new BehaviorSubject<loginResponse>(JSON.parse(localStorage.getItem('credenciais')));

        
    }

   
    public get userValue(): tokenUser{
        return this.userSubject.value;
    }
    public get loginValue(): loginResponse{
        return this.loginSubject.value;
    }

    login(login, password) {
        return this.http.post<loginResponse>(`${environment.apiUrl}/auth`, { login, password })
           .pipe(map(response => {
                this.header = new HttpHeaders({Authorization: `Bearer ${response.token}`} )   
            // store user details and jwt token in local storage to keep user logged in between page refreshe
                this.userSubject.next(JSON.parse(window.atob(response.token.split(".")[1])));
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
        return this.http.post<User>(`${environment.apiUrl}/register`, user);
    }

    getAll() {
        return this.http.get<Pageable>(`${environment.apiUrl}/listUsers?pageNum=0`,{headers:this.header})
        
    }

    getById(id: bigint) {
        return this.http.get<userDTO>(`${environment.apiUrl}/getById/${id}`,{headers:this.header});
    }

    update(id, params) {
        return this.http.put<User>(`${environment.apiUrl}/update/${id}`, params,{headers:this.header})
            .pipe(map(x => { 
                 var updated :User = x;
                 return updated;
            }));
    }

    delete(id: bigint) {
        return this.http.delete(`${environment.apiUrl}/remove/${id}`,{headers:this.header})
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.Id) {
                    this.logout();
                }
                return x;
            }));
    }
}
