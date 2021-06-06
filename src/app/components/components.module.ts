import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ChatComponent } from './chat/chat.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    
    
    
  ],
  declarations: [
    ChatComponent
  ],
  exports:[ 
    ChatComponent
   ]
})
export class ComponentsPageModule {}
