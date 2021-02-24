import { Component, OnInit } from "@angular/core";
import { AccountService } from "@app/_services";
import { Projetos } from "../product.model";
import { ProductService } from "../product.service";

@Component({
  templateUrl: 'projetos.component.html',
  styleUrls: ['projetos.component.css']
})

export class projetosComponent implements OnInit{

  projetos : Projetos[]
  displayedColumns = ['id','name','descricao']

  constructor(
    private accountService: AccountService,
    private productService: ProductService,
    ) {

  }
  ngOnInit():void{
    this.productService.read().subscribe(projetos =>{
      this.projetos = projetos
      console.log(projetos)
    })

  }
}
