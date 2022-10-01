import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CarritoService } from '../../carrito/carrito.service';
import { PasarelaService } from '../pasarela.service';
import { ToastrService } from 'ngx-toastr';
import { ICarrito } from 'src/app/shared/models/carrito';
import { IOrder } from '../../shared/models/order';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-pasarela-payment',
  templateUrl: './pasarela-payment.component.html',
  styleUrls: ['./pasarela-payment.component.scss']
})
export class PasarelaPaymentComponent implements OnInit {

  @Input() checkOutForm!:FormGroup;
  constructor(private carritoService: CarritoService, private ckeckOutService: PasarelaService,
      private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  submitOrder(){
    const carrito = this.carritoService.getCurrentCarritoValue();
    const orderToCreate = this.getOrderToCreate(carrito)
    this.ckeckOutService.createOrder(orderToCreate).subscribe((order:any)=>{
      this.toastr.success('Orden creada correctamente');
      this.carritoService.eliminarLocalCarrito(carrito.id);
      const navigationExtras : NavigationExtras = {state: order};
      this.router.navigate(['pasarela/success'], navigationExtras);
      console.log(order);
    })
  }
  
  private getOrderToCreate(carrito: ICarrito) {
    return {
      carritoId: carrito.id,
      deliveryMethodId: +this.checkOutForm.get('deliveryForm')?.get('deliveryMethod')?.value,
      shipToAddress: this.checkOutForm.get('addressForm')?.value,
    }
  }

}
