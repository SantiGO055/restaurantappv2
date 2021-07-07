import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { VibrationService } from './vibration.service';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  readonly COLOR_SUCCESS = 'success';
  readonly COLOR_DANGER  = 'danger';

  constructor(
   private toastController:ToastController,
   private vibrateService:VibrationService,
  ) { }

  presentSuccess(mensaje:string) {    
    this.toast(mensaje, this.COLOR_SUCCESS);
  }
  
  presentDanger(mensaje:string) {    
    this.toast(mensaje, this.COLOR_DANGER);
    this.vibrateService.on20Seconds();
  }

  async toast(mensaje:string, color:string){
    const toast = await this.toastController.create({
      message:mensaje,
      duration: 1500,
      color,
      position: 'top'
    });
    toast.present();
  }

}
