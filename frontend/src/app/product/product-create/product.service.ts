import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar } from'@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Projetos } from './product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products"
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
    return this.http.post<Projetos>(this.baseUrl, Projeto);
  }
  read(): Observable<Projetos[]> {
    return this.http.get<Projetos[]>(this.baseUrl);
  }
  readById(id: number): Observable<Projetos>{
    const url = `${this.baseUrl}/${id}`;
      return this.http.get<Projetos>(url);
  }
  update(projeto: Projetos): Observable<Projetos>{
    const url = `${this.baseUrl}/${projeto.id}`;
    return this.http.put<Projetos>(url, projeto);
  }
  delete(id: number): Observable<Projetos>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Projetos>(url);
  }

  }
