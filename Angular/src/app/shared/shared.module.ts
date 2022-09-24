import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { OrdenTotalesComponent } from './components/orden-totales/orden-totales.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';



@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    OrdenTotalesComponent,
    TextInputComponent
  ],
  imports: [
    CommonModule,
    NgbPaginationModule,
    NgbCarouselModule,
    ReactiveFormsModule,
    NgbDropdownModule,
  ],
  exports:[
    NgbPaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    NgbCarouselModule,
    OrdenTotalesComponent,
    ReactiveFormsModule,
    NgbDropdownModule,
    TextInputComponent
  ]
})
export class SharedModule { }
