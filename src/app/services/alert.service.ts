import { Injectable } from '@angular/core';
import { SysError } from '../entities/sysError';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }


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


}
