import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { CarritoService } from '../../carrito/carrito.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product!: Product
  constructor(private carritoService: CarritoService) { }

  ngOnInit(): void {
  }

  agregarACarrito(){
    this.carritoService.addItemCarrito(this.product);
  }

}
