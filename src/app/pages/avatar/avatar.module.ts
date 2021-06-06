import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvatarPageRoutingModule } from './avatar-routing.module';

import { AvatarPage } from './avatar.page';
import { UploadComponent } from '../../upload/upload.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvatarPageRoutingModule
  ],
  declarations: [AvatarPage,UploadComponent]
})
export class AvatarPageModule {}
