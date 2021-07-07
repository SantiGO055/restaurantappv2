import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaIngresoPageRoutingModule } from './pagina-ingreso-routing.module';

import { PaginaIngresoPage } from './pagina-ingreso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaIngresoPageRoutingModule
  ],
  declarations: [PaginaIngresoPage]
})
export class PaginaIngresoPageModule {}
