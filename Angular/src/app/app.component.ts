import { Component, OnInit } from '@angular/core';
import { CarritoService } from './carrito/carrito.service';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Angular';

  constructor(private carritoService: CarritoService, private cuentaService: AccountService){

  }
  ngOnInit(): void {
    this.loadCarrito();
    this.loadUser();
  }


  loadCarrito(){
    const carritoId = localStorage.getItem('carrito_id');
    if(carritoId){
      this.carritoService.getCarrito(carritoId).subscribe(
        () => console.log('Carrito inizialisado')
      , error =>{
        console.log(error);
        
      })
    }
  }

  loadUser(){
    const token = localStorage.getItem('token') || '';
      this.cuentaService.cargarUsuario(token).subscribe(() =>{
        
      })
  }
}
