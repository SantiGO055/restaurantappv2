import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenPedidoPageRoutingModule } from './resumen-pedido-routing.module';

import { ResumenPedidoPage } from './resumen-pedido.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumenPedidoPageRoutingModule,
    PipesModule
  ],
  declarations: [ResumenPedidoPage]
})
export class ResumenPedidoPageModule {}
