import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { CarritoModule } from './carrito/carrito.module';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent,
    data: {breadcrumb: 'Home'}
  },
  {
    path: 'test-error', 
    component: TestErrorComponent,
    data: {breadcrumb: 'Test Errors'}
  },
  {
    path: 'server-error', 
    component: ServerErrorComponent,
    data: {breadcrumb: 'Server Error'}
  },
  {
    path: 'not-found', 
    component: NotFoundComponent,
    data: {breadcrumb: 'Not Found'}
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule),
    data: {breadcrumb: 'Tienda'}
  },
  {
    path: 'carrito',
    loadChildren: () => import('./carrito/carrito.module').then(m => m.CarritoModule),
    data: {breadcrumb: 'Carrito'}
  },
  {
    path: 'pago',
    canActivate : [AuthGuard],
    loadChildren: () => import('./pasarela/pasarela.module').then(m => m.PasarelaModule),
    data: {breadcrumb: 'Proceso de pago'}
  },
  {
    path: 'auth',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
    data: {breadcrumb:  {skip: true}}
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
