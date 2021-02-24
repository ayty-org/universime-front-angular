import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Projetos } from "./product.model";
import { ProductService } from "./product.service";


@Component({
  templateUrl: 'update.component.html',
  selector: 'update.component',
  styleUrls: ['update.component.css']
})

export class updateComponent implements OnInit{
  constructor(
    private router: Router,
     private productService: ProductService,
      private route: ActivatedRoute,
      ){}
  projeto: Projetos


  ngOnInit(): void{
    const id = +this.route.snapshot.paramMap.get('id')
    this.productService.readById(id).subscribe(projeto => {
      this.projeto = projeto;
    })
  }

    updateProduct(): void{
      this.productService.update(this.projeto).subscribe(() => {
        this.productService.showMessage('Projeto atualizado com sucesso')
        this.router.navigate(['/cadastrar']);
      })
    }

  cancel():void{
    this.router.navigate(['/cadastrar']);
  }

}
