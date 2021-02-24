import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Projetos } from "./product.model";
import { ProductService } from "./product.service";

@Component({
  templateUrl: 'delete.component.html',
  styleUrls: ['delete.component.css']
})

export class deleteComponent implements OnInit{

  projeto: Projetos

  constructor(private productService: ProductService,
     private router: Router,
      private route: ActivatedRoute
      ){

  }
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe(projeto => {
      this.projeto = projeto;
    })
  }

  deleteProduct():void{
    this.productService.delete(this.projeto.id).subscribe(() =>{
      this.productService.showMessage('Projeto excluido com sucesso!');
      this.router.navigate(['/cadastrar']);
    })
  }
  cancel():void{
    this.router.navigate(['/cadastrar']);
  }
}

