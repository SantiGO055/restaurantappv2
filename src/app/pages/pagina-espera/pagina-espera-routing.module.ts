import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaEsperaPage } from './pagina-espera.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaEsperaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaEsperaPageRoutingModule {}
