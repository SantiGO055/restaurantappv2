import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadopedidoPageRoutingModule } from './listadopedido-routing.module';

import { ListadopedidoPage } from './listadopedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadopedidoPageRoutingModule
  ],
  declarations: [ListadopedidoPage]
})
export class ListadopedidoPageModule {}
