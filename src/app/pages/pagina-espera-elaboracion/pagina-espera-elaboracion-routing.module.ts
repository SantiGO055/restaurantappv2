import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaEsperaElaboracionPage } from './pagina-espera-elaboracion.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaEsperaElaboracionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaEsperaElaboracionPageRoutingModule {}
