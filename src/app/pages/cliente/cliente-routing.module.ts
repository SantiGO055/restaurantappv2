import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientePage } from './cliente.page';

const routes: Routes = [

  {
    path: '',
    component: ClientePage,
    children: [
      {
        path: 'pagina-ingreso',
        loadChildren: () => import('../pagina-ingreso/pagina-ingreso.module').then( m => m.PaginaIngresoPageModule)
      },
      {
        path: '/resultados-encuesta',
        loadChildren: () => import('../resultados-encuesta/resultados-encuesta.module').then( m => m.ResultadosEncuestaPageModule)
      },
      {
        path: '/cliente/asignacion-mesa',
        loadChildren: () => import('../asignacion-mesa/asignacion-mesa.module').then( m => m.AsignacionMesaPageModule)
      },
      {
        path: '',
        redirectTo: 'pagina-ingreso',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientePageRoutingModule {}
