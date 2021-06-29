import { Injectable } from '@angular/core';
import { LectorqrService } from './lectorqr.service';
import { SupportedFormat } from '@capacitor-community/barcode-scanner';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class LectorQrPropinaService  extends LectorqrService{

  constructor(
    alertService:AlertService
    ) { 
    super(alertService);    
  }

  protected traerFormatosAceptados(): [SupportedFormat] {
    return [SupportedFormat.QR_CODE];
  }

  async escanear(){
    try{
      const codigo = await super.scan();    
      const propinaJson = JSON.parse( codigo);        
      return parseInt(propinaJson.propina);
    }catch( error ){      
      return false;
    }    
  }

  
}
