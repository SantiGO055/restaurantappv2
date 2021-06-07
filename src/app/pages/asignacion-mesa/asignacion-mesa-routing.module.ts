import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsignacionMesaPage } from './asignacion-mesa.page';

const routes: Routes = [
  {
    path: '',
    component: AsignacionMesaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignacionMesaPageRoutingModule {}
