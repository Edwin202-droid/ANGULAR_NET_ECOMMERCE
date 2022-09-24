import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../carrito/carrito.service';
import { Observable } from 'rxjs';
import { ICarrito } from '../../shared/models/carrito';
import { IUser } from '../../shared/models/user';
import { AccountService } from '../../account/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  carrito$!: Observable<ICarrito>;
  user$!:Observable<IUser>;

  constructor(private carritoService:CarritoService, private cuentaService: AccountService) { }

  ngOnInit(): void {
    this.carrito$ = this.carritoService.carrito$;
    this.user$ = this.cuentaService.currentUser$;
  }

  logOut(){
    this.cuentaService.logOut();
  }

}
