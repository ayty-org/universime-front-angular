import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { AccountService } from '@app/_services';


import { Router } from '@angular/router';
import { Projetos } from './product.model';

@Component({
  templateUrl: 'list.component.html' ,
  selector: 'list.component',
  styleUrls: ['list.component.css']
})
export class ListComponent implements OnInit {
    projetos : Projetos[]
    displayedColumns = ['id','name','description','action']

    constructor(
        private productService: ProductService,
        private router: Router) {}

    ngOnInit() {

      this.productService.read().subscribe(projetos =>{
        this.projetos = projetos
      
      })
    }

    createProduct():void{
      this.productService.showMessage('Projeto criado!')
    }
    cancel():void{
      this.router.navigate(['/'])
    }
}
