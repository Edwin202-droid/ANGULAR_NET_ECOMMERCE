import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasarelaComponent } from './pasarela.component';
import { PasarelaSuccessComponent } from './pasarela-success/pasarela-success.component';

const routes: Routes = [
  {path: '', component: PasarelaComponent},
  {path: 'success', component: PasarelaSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasarelaRoutingModule { }
