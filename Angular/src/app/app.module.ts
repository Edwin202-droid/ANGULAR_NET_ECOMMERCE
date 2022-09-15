import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { CoreModule } from './core/core.module';
import { ShopModule } from './shop/shop.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeModule } from './home/home.module';
import { HTTP_INTERCEPTORS} from '@angular/common/http'
import { InterceptorsInterceptor } from './core/interceptors/interceptors.interceptor';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    NgbModule,
    HomeModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorsInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
