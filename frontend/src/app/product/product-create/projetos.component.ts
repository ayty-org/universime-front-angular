import { Component, OnInit } from "@angular/core";
import { AccountService } from "@app/_services";
import { Projetos } from "./product.model";
import { ProductService } from "./product.service";
import { Router } from '@angular/router';



@Component({
  templateUrl: 'projetos.component.html',
  selector: 'projetos.component',
  styleUrls: ['projetos.component.css']
})

export class projetosComponent implements OnInit{

  projetos : Projetos[]
  displayedColumns = ['id','name','description','action']

  constructor(
    private productService: ProductService,
    private router: Router) {}

  
  ngOnInit():void{
    this.productService.read().subscribe(projetos =>{
     
    })

   

  }
  cancel():void{
    this.router.navigate(['/'])
  }
}
