import { Component } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  templateUrl: 'teste.component.html',
  selector: 'teste.component',
  styleUrls: ['teste.component.css']
 })
export class TesteComponent {

  constructor(private productService: ProductService) {


  }

}
