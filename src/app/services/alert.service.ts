import { Injectable } from '@angular/core';
import { SysError } from '../entities/sysError';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import Swal from'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor( 
    public alertController:AlertController,
    public router: Router,
    public navCtrl:NavController,
  ) { }


  showSysError(error:SysError,title: string){
    //@todo pasar a alert estetico
    // Swal.fire({
    //   icon: 'error',
    //   title: title,
    //   text: error.getAlert(),
    // });
  }

  showSucess(message:string,title: string,ruta:string =null){
    console.log(message)
    console.log(title)
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
    }).then(result=>{
      if(result.isConfirmed){
        if(ruta == null){
          this.navCtrl.pop();
        }else{
          this.router.navigate([ruta])
        }
      }
    })
  }

  showDanger(message:string, title:string){
    
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,
    })
    
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
showAlertYesNoHTML(title: string, html: string){
  var retorno = false;
  return Swal.fire({
    title: '<strong> ' + title + ' </strong>',
    icon: 'info',
    html: html,
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText:
      '<i class="fa fa-thumbs-up"></i> Si',
    confirmButtonAriaLabel: 'Thumbs up, great!',
    cancelButtonText:
      '<i class="fa fa-thumbs-down"></i> No',
    cancelButtonAriaLabel: 'Thumbs down'
  }).then(results=>{
    if(results.isConfirmed){
      retorno = true;
    }
    else{
      retorno = false;
    }
    return retorno;
  });
  

}



}
