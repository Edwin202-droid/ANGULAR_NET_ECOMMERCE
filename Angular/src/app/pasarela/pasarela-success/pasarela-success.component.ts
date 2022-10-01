import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from '../../shared/models/order';

@Component({
  selector: 'app-pasarela-success',
  templateUrl: './pasarela-success.component.html',
  styleUrls: ['./pasarela-success.component.scss']
})
export class PasarelaSuccessComponent implements OnInit {

  order!:IOrder;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation && navigation.extras && navigation.extras.state;
    if(state){
      this.order = state as IOrder;
    }
  }

  ngOnInit(): void {
  }

}