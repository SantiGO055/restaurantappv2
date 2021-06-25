import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaElaboracionPageRoutingModule } from './lista-elaboracion-routing.module';

import { ListaElaboracionPage } from './lista-elaboracion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaElaboracionPageRoutingModule
  ],
  declarations: [ListaElaboracionPage]
})
export class ListaElaboracionPageModule {}
