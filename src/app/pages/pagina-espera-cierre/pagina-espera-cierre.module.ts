import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaEsperaCierrePageRoutingModule } from './pagina-espera-cierre-routing.module';

import { PaginaEsperaCierrePage } from './pagina-espera-cierre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaEsperaCierrePageRoutingModule
  ],
  declarations: [PaginaEsperaCierrePage]
})
export class PaginaEsperaCierrePageModule {}
