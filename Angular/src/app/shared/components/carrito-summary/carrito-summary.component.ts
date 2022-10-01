import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CarritoService } from '../../../carrito/carrito.service';
import { Observable } from 'rxjs';
import { Carrito, ICarritoItem } from '../../models/carrito';

@Component({
  selector: 'app-carrito-summary',
  templateUrl: './carrito-summary.component.html',
  styleUrls: ['./carrito-summary.component.scss']
})
export class CarritoSummaryComponent implements OnInit {

  carrito$!: Observable<Carrito>;
  @Output() decrement :EventEmitter<ICarritoItem> = new EventEmitter<ICarritoItem>();
  @Output() increment :EventEmitter<ICarritoItem> = new EventEmitter<ICarritoItem>();
  @Output() remove :EventEmitter<ICarritoItem> = new EventEmitter<ICarritoItem>();

  @Input() esCarrito = true;
  
  constructor(private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.carrito$ = this.carritoService.carrito$;
  }

  decrementarCantidadItemCarrito(item:ICarritoItem){
    this.decrement.emit(item);
  }
  incrementarCantidadItemCarrito(item:ICarritoItem){
    this.increment.emit(item);
  }
  removerItemDelCarrito(item:ICarritoItem){
    this.remove.emit(item);
  }
}
