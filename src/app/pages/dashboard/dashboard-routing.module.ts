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
        path: 'pagina-espera',
        loadChildren: () => import('../pagina-espera/pagina-espera.module').then( m => m.PaginaEsperaPageModule)
      },
      {
        path: 'resumen-pedido',
        loadChildren: () => import('../resumen-pedido/resumen-pedido.module').then( m => m.ResumenPedidoPageModule)
      },
      {
        path: 'pagina-espera-elaboracion',
        loadChildren: () => import('../pagina-espera-elaboracion/pagina-espera-elaboracion.module').then( m => m.PaginaEsperaElaboracionPageModule)
      },
      {
        path: 'lista-elaboracion',
        loadChildren: () => import('../lista-elaboracion/lista-elaboracion.module').then( m => m.ListaElaboracionPageModule)
      },   
      {
        path: 'pagina-espera-cierre',
        loadChildren: () => import('../pagina-espera-cierre/pagina-espera-cierre.module').then( m => m.PaginaEsperaCierrePageModule)
      },   
    {
      path: 'encuesta',
      loadChildren: () => import('../encuesta/encuesta.module').then( m => m.EncuestaPageModule)
    }, {
      path: 'seleccionar-mesa/:id',
      loadChildren: () => import('../seleccionar-mesa/seleccionar-mesa.module').then( m => m.SeleccionarMesaPageModule)
    },
    {
      path: 'listado-pedido-cocinero',
      loadChildren: () => import('../listado-pedido-cocinero/listado-pedido-cocinero.module').then( m => m.ListadoPedidoCocineroPageModule)
    },
    {
      path: 'factura',
      loadChildren: () => import('../factura/factura.module').then( m => m.FacturaPageModule)
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
