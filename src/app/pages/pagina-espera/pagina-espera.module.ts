import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaEsperaPageRoutingModule } from './pagina-espera-routing.module';

import { PaginaEsperaPage } from './pagina-espera.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaEsperaPageRoutingModule
  ],
  declarations: [PaginaEsperaPage]
})
export class PaginaEsperaPageModule {}
