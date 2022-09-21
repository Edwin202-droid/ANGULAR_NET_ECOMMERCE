import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/models/product';
import { ShopService } from '../shop.service';
import { BreadcrumbService } from 'xng-breadcrumb'
import { CarritoService } from '../../carrito/carrito.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;
  cantidad = 1;

  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute, 
    private bcService: BreadcrumbService, private carritoService: CarritoService) { 
    this.bcService.set('@detalles','');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    this.shopService.getProduct(+(this.activateRoute.snapshot.paramMap.get('id') || 0)).subscribe(product =>{
      this.product = product;
      this.bcService.set('@detalles', product.name);
    }, error => {
      console.log(error);
      
    });
  }

  agregarItemAlCarrito(){
    this.carritoService.addItemCarrito(this.product, this.cantidad);
  }

  incrementarCantidad(){
    this.cantidad++
  }

  decrementarCantidad(){
    if(this.cantidad > 1){
      this.cantidad--
    }
  }

}
