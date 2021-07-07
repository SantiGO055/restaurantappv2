import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeleccionarMesaPage } from './seleccionar-mesa.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionarMesaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeleccionarMesaPageRoutingModule {}
