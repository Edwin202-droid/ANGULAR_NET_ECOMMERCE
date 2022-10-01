import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PasarelaService } from '../pasarela.service';
import { IDeliveryMethod } from '../../shared/models/deliveryMethod';
import { CarritoService } from '../../carrito/carrito.service';

@Component({
  selector: 'app-pasarela-delivery',
  templateUrl: './pasarela-delivery.component.html',
  styleUrls: ['./pasarela-delivery.component.scss']
})
export class PasarelaDeliveryComponent implements OnInit {

  @Input() checkOutForm !: FormGroup;
  deliveryMethods:IDeliveryMethod[]=[];

  constructor(private checkOutService: PasarelaService, private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.checkOutService.getDeliveryMethods().subscribe(dms =>{
      this.deliveryMethods = dms
    },error =>{
      console.log(error);
    })
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod){
    this.carritoService.setShippinPrice(deliveryMethod);
  }

}
