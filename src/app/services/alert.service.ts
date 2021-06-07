import { Injectable } from '@angular/core';
import { SysError } from '../entities/sysError';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor( 
    public alertController:AlertController,
    public router: Router,
  ) { }


  showSysError(error:SysError){
    //@todo pasar a alert estetico
    alert('Ha ocurrido un error:'+error.getAlert());
  }

  showSucess(message:string){
    //@todo pasar a alert estetico
    alert(message);
  }

  showDanger(message:string){
    //@todo pasar a alert estetico
    alert(message);
  }

  confirm(message:string):boolean{
    return this.confirm(message);
  }


//@todo pasar a servicio
async presentAlert(header:string) {
  const alert = await this.alertController.create({
    cssClass: 'alert-photos',
    header: header,          
    buttons: [
      {
        text: 'Inicio',
        handler: () => {
          this.router.navigateByUrl('/dashboard');
        }
      },
      {
        text: 'Ir a galería',          
        cssClass: 'secondary',
        handler: (blah) => {
          this.router.navigateByUrl('/dashboard/home');
        }
      }
    ]    
  });
  await alert.present();
  const { role } = await alert.onDidDismiss();    
}


}
