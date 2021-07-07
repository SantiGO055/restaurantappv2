import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeleccionarMesaPageRoutingModule } from './seleccionar-mesa-routing.module';

import { SeleccionarMesaPage } from './seleccionar-mesa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeleccionarMesaPageRoutingModule
  ],
  declarations: [SeleccionarMesaPage]
})
export class SeleccionarMesaPageModule {}
