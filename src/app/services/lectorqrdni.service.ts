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
      //const  codigo  ='00232638557@MALAGAMBA@MARIA MONICA@F@27462786@B@12/11/1979@02/12/2013';
      //const  codigo  ='00490436790@TRUCCO@CONSTANZA ZO@F@42528721@A@13/04/2000@20/04/2017@234';
      //const  codigo  ='00204605209@DOMINGUEZ@DANTE ROGELIO@M@37898702@C@05/04/1994@15/07/2013';
      return DNIQRResponse.fromQR(codigo);        
    }catch( error ){
      throw new SysError('Codigo QR invalido')
    }
  }

  
  
}
