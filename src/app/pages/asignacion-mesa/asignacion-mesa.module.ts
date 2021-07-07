import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignacionMesaPageRoutingModule } from './asignacion-mesa-routing.module';

import { AsignacionMesaPage } from './asignacion-mesa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignacionMesaPageRoutingModule
  ],
  declarations: [AsignacionMesaPage]
})
export class AsignacionMesaPageModule {}
