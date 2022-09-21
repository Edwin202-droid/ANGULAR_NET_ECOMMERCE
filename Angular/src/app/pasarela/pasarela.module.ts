import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasarelaRoutingModule } from './pasarela-routing.module';
import { PasarelaComponent } from './pasarela.component';


@NgModule({
  declarations: [
    PasarelaComponent
  ],
  imports: [
    CommonModule,
    PasarelaRoutingModule
  ]
})
export class PasarelaModule { }
