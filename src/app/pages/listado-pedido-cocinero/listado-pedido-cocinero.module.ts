import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoPedidoCocineroPageRoutingModule } from './listado-pedido-cocinero-routing.module';

import { ListadoPedidoCocineroPage } from './listado-pedido-cocinero.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoPedidoCocineroPageRoutingModule,
    PipesModule
  ],
  declarations: [ListadoPedidoCocineroPage]
})
export class ListadoPedidoCocineroPageModule {}
