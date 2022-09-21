import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasarelaComponent } from './pasarela.component';

const routes: Routes = [
  {path: '', component: PasarelaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasarelaRoutingModule { }
