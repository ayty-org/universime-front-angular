import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar } from'@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Projetos } from './product.model';
import { environment } from '@environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,

    ) { }

  showMessage(msg: string): void{
    this.snackBar.open(msg,'X', {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ['msg-sucess']
    })
  }
  create(Projeto: Projetos): Observable<Projetos>{
    return this.http.post<Projetos>(`${environment.apiUrl}/projects`, Projeto);
  }
  read(): Observable<Projetos[]> {
    return this.http.get<Projetos[]>(`${environment.apiUrl}/projects`);
  }
  readById(id: number): Observable<Projetos>{
      return this.http.get<Projetos>(`${environment.apiUrl}/projects/${id}`);
  }
  update(id: number, projeto: Projetos): Observable<Projetos>{
    return this.http.put<Projetos>(`${environment.apiUrl}/projects/${id}`, projeto);
  }
  delete(id: number): Observable<Projetos>{
    return this.http.delete<Projetos>(`${environment.apiUrl}/projects/${id}`);
  }

  }
