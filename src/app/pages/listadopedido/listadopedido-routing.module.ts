import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadopedidoPage } from './listadopedido.page';

const routes: Routes = [
  {
    path: '',
    component: ListadopedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadopedidoPageRoutingModule {}
