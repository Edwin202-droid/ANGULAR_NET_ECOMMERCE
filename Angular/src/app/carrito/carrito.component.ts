import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICarrito, ICarritoItem } from '../shared/models/carrito';
import { CarritoService } from './carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  carrito$ !: Observable<ICarrito>

  constructor(private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.carrito$ = this.carritoService.carrito$;
  }

  removerItemDelCarrito(item:ICarritoItem){
    this.carritoService.sacarItemDelCarrito(item);
  }

  incrementarCantidadItemCarrito(item: ICarritoItem){
    this.carritoService.incrementarCantidad(item);
  }

  decrementarCantidadItemCarrito(item: ICarritoItem){
    this.carritoService.decrementarCantidad(item);
  }

}
