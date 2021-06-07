import { Injectable } from '@angular/core';
import { SupportedFormat } from '@capacitor-community/barcode-scanner';
import { Plugins } from '@capacitor/core';
import { EMPTY } from 'rxjs';
import { ScanResult } from '../entities/scanResult';
import { SysError } from '../entities/sysError';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})

export abstract class LectorqrService {

  public scanActive:boolean;

  constructor(
    public alertService:AlertService
  ) { 
    this.scanActive= false;
  }

  /**
   * Determina el formato aceptado para esta lectura 
   * @returns SupportedFormat acepted values 
   */
  protected traerFormatosAceptados(): [SupportedFormat] {
    return [SupportedFormat.QR_CODE];
  }
  
  async escanear():Promise<string>{
    const allow = this.checkPermition();
    let acreditado = 0;
    let codigo = '';
    if(allow){   
      this.scanActive = true;
      const { BarcodeScanner } = Plugins;  
      //BarcodeScanner.hideBackground();
      const result = await BarcodeScanner.startScan({ targetedFormats: this.traerFormatosAceptados() });      
      if (result.hasContent) {                
        this.scanActive = false;      
        return  result.content.trim();            
      }
      throw new SysError('El codigo no posee contenido');    
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
          const c = this.alertService.confirm('Si desea otorgar permiso para usar su cámara, habilítelo en la configuración de la aplicación.');          
          if (c) {
            await BarcodeScanner.openAppSettings();
          }
          resolve(false);
        }
      });
  }
}
