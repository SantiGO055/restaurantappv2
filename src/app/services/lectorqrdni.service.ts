import { Injectable } from '@angular/core';
import { LectorqrService } from './lectorqr.service';
import { SupportedFormat } from '@capacitor-community/barcode-scanner';
import { AlertService } from './alert.service';
import { SysError } from '../entities/sysError';
import { DNIQRResponse } from '../entities/DNIQRResponse';

@Injectable({
  providedIn: 'root'
})
export class LectorQrDniService  extends LectorqrService{

  constructor(
    alertService:AlertService
    ) { 
    super(alertService);    
  }

  protected traerFormatosAceptados(): [SupportedFormat] {
    return [SupportedFormat.PDF_417];
  }

  
  async escanear():Promise<DNIQRResponse>{
    try{
      const codigo = await super.scan();      
      return DNIQRResponse.fromQR(codigo);        
    }catch( error ){
      throw new SysError('Codigo QR invalido')
    }
  }

  
  
}
