import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { OrdenTotalesComponent } from './components/orden-totales/orden-totales.component';



@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    OrdenTotalesComponent
  ],
  imports: [
    CommonModule,
    NgbPaginationModule,
    NgbCarouselModule
  ],
  exports:[
    NgbPaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    NgbCarouselModule,
    OrdenTotalesComponent
  ]
})
export class SharedModule { }
