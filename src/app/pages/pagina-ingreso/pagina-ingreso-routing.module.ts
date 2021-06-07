import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaIngresoPage } from './pagina-ingreso.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaIngresoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaIngresoPageRoutingModule {}
