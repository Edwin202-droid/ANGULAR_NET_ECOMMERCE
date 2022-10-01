import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { OrdenTotalesComponent } from './components/orden-totales/orden-totales.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';
import { CdkStepperModule } from "@angular/cdk/stepper";
import { StepperComponent } from './components/stepper/stepper.component';
import { CarritoSummaryComponent } from './components/carrito-summary/carrito-summary.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    OrdenTotalesComponent,
    TextInputComponent,
    StepperComponent,
    CarritoSummaryComponent
  ],
  imports: [
    CommonModule,
    NgbPaginationModule,
    NgbCarouselModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    CdkStepperModule,
    RouterModule
  ],
  exports:[
    NgbPaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    NgbCarouselModule,
    OrdenTotalesComponent,
    ReactiveFormsModule,
    NgbDropdownModule,
    TextInputComponent,
    CdkStepperModule,
    StepperComponent,
    CarritoSummaryComponent
  ]
})
export class SharedModule { }
