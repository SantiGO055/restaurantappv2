import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaEsperaCierrePage } from './pagina-espera-cierre.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaEsperaCierrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaEsperaCierrePageRoutingModule {}
