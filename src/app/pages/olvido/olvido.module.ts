import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OlividoPageRoutingModule } from './olvido-routing.module';

import { OlividoPage } from './olvido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OlividoPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [OlividoPage]
})
export class OlividoPageModule {}
