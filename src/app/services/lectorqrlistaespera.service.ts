import { Injectable } from '@angular/core';
import { LectorqrService } from './lectorqr.service';
import { SupportedFormat } from '@capacitor-community/barcode-scanner';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class LectorQrListaEsperaService  extends LectorqrService{

  constructor(
    alertService:AlertService
    ) { 
    super(alertService);    
  }

  protected traerFormatosAceptados(): [SupportedFormat] {
    return [SupportedFormat.QR_CODE];
  }

  async escanear(){
    const codigo = super.scan();
    return true;
  }

  
}
