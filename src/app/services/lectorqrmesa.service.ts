import { Injectable } from '@angular/core';
import { LectorqrService } from './lectorqr.service';
import { SupportedFormat } from '@capacitor-community/barcode-scanner';
import { AlertService } from './alert.service';
import { SysError } from '../entities/sysError';

@Injectable({
  providedIn: 'root'
})
export class LectorQRMesaService  extends LectorqrService{

  constructor(
    alertService:AlertService
    ) { 
    super(alertService);    
  }

  protected traerFormatosAceptados(): [SupportedFormat] {
    return [SupportedFormat.QR_CODE];
  }

  
  async escanear():Promise<string>{
    try{
      const codigo = await super.scan();
      const json = JSON.parse( codigo);
      return json.mesaId;
    }catch( error ){
      throw new SysError('Codigo QR invalido')
    }
  }
  
}
