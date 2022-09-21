import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICarrito, ICarritoItem, Carrito, ICarritoTotal } from '../shared/models/carrito';
import { BehaviorSubject } from 'rxjs';
import { map } from "rxjs/operators";
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  baseUrl = 'https://localhost:5001/api/';
  private carritoSource = new BehaviorSubject(null) as unknown as BehaviorSubject<ICarrito>;;
  carrito$ = this.carritoSource.asObservable();

  //Para el resumen del pedido
  private carritoTotalSource = new BehaviorSubject(null) as unknown as BehaviorSubject<ICarritoTotal>;
  carritoTotal$ = this.carritoTotalSource.asObservable(); 

  constructor(private http: HttpClient) { }

  getCarrito(id:string){
    return this.http.get(this.baseUrl + 'carrito?id='+ id)
      .pipe(
        map((carrito : any) =>{
          this.carritoSource.next(carrito);
          this.calcularTotal();
        })
      );
  }

  setCarrito(carrito: ICarrito){
    return this.http.post(this.baseUrl + 'carrito', carrito).subscribe((response :any) =>{
      this.carritoSource.next(carrito);
      this.calcularTotal();
    }, error =>{
      console.log(error)
    })
  }

  getCurrentCarritoValue(){
    return this.carritoSource.value;
  }


  addItemCarrito(item:Product, cantidad = 1){
    const itemAdd: ICarritoItem = this.mapProductCARRITO(item, cantidad);
    const carrito = this.getCurrentCarritoValue() ?? this.crearCarrito();
    carrito.items = this.agregarOActualizar(carrito?.items , itemAdd, cantidad);
    this.setCarrito(carrito );
  }


  agregarOActualizar(items: ICarritoItem[], itemAdd: ICarritoItem, cantidad: number): ICarritoItem[] {
    
    const index = items.findIndex(i => i.id === itemAdd.id);
    if(index === -1){
      itemAdd.cantidad = cantidad;
      items?.push(itemAdd);
    }else{
      items[index].cantidad += cantidad
    }

    return items;
  }

  crearCarrito(): ICarrito | null {
    const carrito = new Carrito();
    localStorage.setItem('carrito_id', carrito.id);
    return carrito;
  }


  mapProductCARRITO(item: Product, cantidad: any): ICarritoItem {
    return {
      id: item.id,
      productName : item.name,
      price : item.price,
      pictureUrl : item.pictureUrl,
      cantidad,
      marca : item.productBrand,
      tipo : item.productType
    }
  }

  private calcularTotal(){
    const carrito = this.getCurrentCarritoValue();
    const envio = 0;
    const subtotal = carrito.items.reduce((a,b) => (b.price * b.cantidad) + a , 0);
    const total = envio + subtotal;
    this.carritoTotalSource.next({
      envio, subtotal, total
    })
  }

  incrementarCantidad(item: ICarritoItem){
    const carrito = this.getCurrentCarritoValue();
    const foundItemInde = carrito.items.findIndex(x => x.id == item.id);
    carrito.items[foundItemInde].cantidad ++ ;
    this.setCarrito(carrito);
  }

  decrementarCantidad(item: ICarritoItem){
    const carrito = this.getCurrentCarritoValue();
    const foundItemInde = carrito.items.findIndex(x => x.id == item.id);
    if(carrito.items[foundItemInde].cantidad > 1){
      carrito.items[foundItemInde].cantidad --
      this.setCarrito(carrito);
    }else{
      this.sacarItemDelCarrito(item)
    }
    this.setCarrito(carrito);
  }
  sacarItemDelCarrito(item: ICarritoItem) {
    const carrito = this.getCurrentCarritoValue();
    if(carrito.items.some(x => x.id === item.id)){
      carrito.items = carrito.items.filter(i => i.id !== item.id);
      if(carrito.items.length > 0){
        this.setCarrito(carrito);
      }else{
        this.eliminarCarrito(carrito)
      }
    }
  }
  eliminarCarrito(carrito: ICarrito) {
    return this.http.delete(this.baseUrl + 'carrito?=id='+carrito.id).subscribe(() =>{
      this.carritoSource.next(null as unknown as ICarrito);
      this.carritoTotalSource.next(null as unknown as ICarritoTotal);
      localStorage.removeItem('carrito');
    }, error =>[
      console.log(error)
    ])
  }


}
