import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoPedidoCocineroPage } from './listado-pedido-cocinero.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoPedidoCocineroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoPedidoCocineroPageRoutingModule {}
