import { ErrorHandler, Injectable } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { AlertService } from './alert.service';
import { SysError } from '../entities/sysError';
import { VibrationService } from './vibration.service';

@Injectable({
  providedIn: 'root',
})
export class SysErrorHandler implements ErrorHandler {
  
  constructor(
    private spinnerService: SpinnerService,
    private alertService: AlertService,
    private vibration: VibrationService
  ) {}

  handleError(err: any): void {    
    let error:SysError;
    // do something with the error    
    if(err instanceof SysError){      
            
      //disparar la accion de error 
    this.alertService.showSysError(err);        
    this.spinnerService.ocultarSpinner();
    this.vibration.on20Seconds();
    }
    else if( err instanceof Error){      
      error = new SysError(err.message);
    }else if( typeof err  === 'string'){
      error = new SysError(err);
    } 
    console.log(error);
  }
  
}
