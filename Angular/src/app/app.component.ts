import { Component, OnInit } from '@angular/core';
import { CarritoService } from './carrito/carrito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Angular';

  constructor(private carritoService: CarritoService){

  }
  ngOnInit(): void {
    const carritoId = localStorage.getItem('carrito_id');
    if(carritoId){
      this.carritoService.getCarrito(carritoId).subscribe(
        () => console.log('Carrito inizialisado')
      , error =>{
        console.log(error);
        
      })
    }
  }
}
