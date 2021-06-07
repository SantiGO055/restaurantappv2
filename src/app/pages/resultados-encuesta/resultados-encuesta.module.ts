import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultadosEncuestaPageRoutingModule } from './resultados-encuesta-routing.module';

import { ResultadosEncuestaPage } from './resultados-encuesta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultadosEncuestaPageRoutingModule
  ],
  declarations: [ResultadosEncuestaPage]
})
export class ResultadosEncuestaPageModule {}
