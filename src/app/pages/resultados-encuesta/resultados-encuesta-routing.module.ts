import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultadosEncuestaPage } from './resultados-encuesta.page';

const routes: Routes = [
  {
    path: '',
    component: ResultadosEncuestaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultadosEncuestaPageRoutingModule {}
