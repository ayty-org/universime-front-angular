import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { Router } from '@angular/router';
import { Projetos } from './product.model';

@Component({
  templateUrl: 'teste.component.html',
  selector: 'teste.component',
  styleUrls: ['teste.component.css']
 })
export class TesteComponent {

projeto: Projetos = {
  name: '',
  descricao: ''
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


