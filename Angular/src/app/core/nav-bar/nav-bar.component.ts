import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../carrito/carrito.service';
import { Observable } from 'rxjs';
import { ICarrito } from '../../shared/models/carrito';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  carrito$!: Observable<ICarrito>;

  constructor(private carritoService:CarritoService) { }

  ngOnInit(): void {
    this.carrito$ = this.carritoService.carrito$;
  }

}
