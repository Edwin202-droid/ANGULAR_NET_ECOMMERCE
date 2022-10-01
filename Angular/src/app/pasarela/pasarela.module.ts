import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasarelaRoutingModule } from './pasarela-routing.module';
import { PasarelaComponent } from './pasarela.component';
import { SharedModule } from '../shared/shared.module';
import { PasarelaAddressComponent } from './pasarela-address/pasarela-address.component';
import { PasarelaDeliveryComponent } from './pasarela-delivery/pasarela-delivery.component';
import { PasarelaReviewComponent } from './pasarela-review/pasarela-review.component';
import { PasarelaPaymentComponent } from './pasarela-payment/pasarela-payment.component';
import { PasarelaSuccessComponent } from './pasarela-success/pasarela-success.component';


@NgModule({
  declarations: [
    PasarelaComponent,
    PasarelaAddressComponent,
    PasarelaDeliveryComponent,
    PasarelaReviewComponent,
    PasarelaPaymentComponent,
    PasarelaSuccessComponent
  ],
  imports: [
    CommonModule,
    PasarelaRoutingModule,
    SharedModule
  ]
})
export class PasarelaModule { }
