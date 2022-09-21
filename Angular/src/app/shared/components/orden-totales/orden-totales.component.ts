import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICarrito, ICarritoTotal } from '../../models/carrito';
import { CarritoService } from '../../../carrito/carrito.service';

@Component({
  selector: 'app-orden-totales',
  templateUrl: './orden-totales.component.html',
  styleUrls: ['./orden-totales.component.scss']
})
export class OrdenTotalesComponent implements OnInit {

  carritoTotal$ !: Observable<ICarritoTotal>
  constructor(private carritoService:CarritoService) { }

  ngOnInit(): void {
    this.carritoTotal$ = this.carritoService.carritoTotal$
  }

}
