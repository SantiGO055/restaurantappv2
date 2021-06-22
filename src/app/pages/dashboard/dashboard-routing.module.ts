import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'registros',
        loadChildren: () => import('../registros/registros.module').then((m) => m.RegistrosPageModule),
      },
      {
        path: 'lista-espera',
        loadChildren: () => import('../lista-espera/lista-espera.module').then( m => m.ListaEsperaPageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('../menu/menu.module').then( m => m.MenuPageModule)
      },
      {
        path: 'listadopedido',
        loadChildren: () => import('../listadopedido/listadopedido.module').then( m => m.ListadopedidoPageModule)
      },
      {
        path: 'pagina-ingreso',
        loadChildren: () => import('../pagina-ingreso/pagina-ingreso.module').then( m => m.PaginaIngresoPageModule)
      },
      {
        path: 'resultados-encuesta',
        loadChildren: () => import('../resultados-encuesta/resultados-encuesta.module').then( m => m.ResultadosEncuestaPageModule)
      },
      {
        path: 'asignacion-mesa',
        loadChildren: () => import('../asignacion-mesa/asignacion-mesa.module').then( m => m.AsignacionMesaPageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
