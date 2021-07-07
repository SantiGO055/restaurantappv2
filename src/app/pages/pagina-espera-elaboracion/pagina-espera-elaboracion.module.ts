import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaEsperaElaboracionPageRoutingModule } from './pagina-espera-elaboracion-routing.module';

import { PaginaEsperaElaboracionPage } from './pagina-espera-elaboracion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaEsperaElaboracionPageRoutingModule
  ],
  declarations: [PaginaEsperaElaboracionPage]
})
export class PaginaEsperaElaboracionPageModule {}
