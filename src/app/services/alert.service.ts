import { Injectable } from '@angular/core';
import { SysError } from '../entities/sysError';
import Swal from'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }


  showSysError(error:SysError,title: string){
    //@todo pasar a alert estetico
    Swal.fire({
      icon: 'error',
      title: title,
      text: error.getAlert(),
    });
  }

  showSucess(message:string,title: string){
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
    })
  }

  showDanger(message:string, title:string){
    
      // console.log(mensaje)
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,
    })
    
  }
  


}
