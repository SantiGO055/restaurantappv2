import { Injectable } from '@angular/core';
import { SupportedFormat } from '@capacitor-community/barcode-scanner';
import { Plugins } from '@capacitor/core';
import { EMPTY } from 'rxjs';
import { ScanResult } from '../entities/scanResult';

@Injectable({
  providedIn: 'root'
})
export class LectorqrService {

  public scanActive:boolean;

  constructor() { 
    this.scanActive= false;
  }
  
  async escanear():Promise<string>{
    const allow = this.checkPermition();
    if(allow){   
      this.scanActive = true;
      const { BarcodeScanner } = Plugins;  
      BarcodeScanner.hideBackground();
      const result = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.PDF_417] });
      console.log('escaneado',result.content);
      if(result.hasContent){
        return result.content;
      }    
    }
    return '';  
  }

  preapare(){
    const { BarcodeScanner } = Plugins;
    BarcodeScanner.prepare();  
  }

  stopScan(){
    const { BarcodeScanner } = Plugins;
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    this.scanActive = false;
  };
  
  async checkPermition():Promise<boolean>{
    return new Promise(
      async (resolve, reject) =>{
        const { BarcodeScanner } = Plugins;
        const status = await BarcodeScanner.checkPermission({force:true});
        if(status.granted){
          resolve(true);
        }else{
          const c = confirm('Si desea otorgar permiso para usar su cámara, habilítelo en la configuración de la aplicación.',);
          if (c) {
            await BarcodeScanner.openAppSettings();
          }
          resolve(false);
        }
      });
  }
}
