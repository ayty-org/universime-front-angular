import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { Router } from '@angular/router';
import { Projetos } from './product.model';
import {FormControl} from '@angular/forms'

@Component({
  templateUrl: 'teste.component.html',
  selector: 'teste.component',
  styleUrls: ['teste.component.css']
 })
export class TesteComponent {

users = []
date = new Date(new Date().getDate());

projeto: Projetos = {
  name: '',
  description: '',
  startDate: this.date,
  endDate: this.date,
  logo: '',
  coordenators: []
}
  constructor(
    private productService: ProductService,
    private router: Router
    ) {}

    ngOnInit(): void {
    }
    createProduct():void{
      const msg = `Projeto ${this.projeto.name} criado!`
      this.productService.create(this.projeto).subscribe(()=> {
        this.productService.showMessage(msg)
        this.router.navigate(['/cadastrar'])
      })

    }
    cancel():void{
      this.router.navigate(['/cadastrar'])
    }
  }


