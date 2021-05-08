import { Component, OnInit } from '@angular/core';
import { LectorqrService } from '../services/lectorqr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {

  constructor(
    public lectorqrService:LectorqrService,
    public router:Router,
    ) { }

    async ngOnInit() {
      this.escanearQr();
     }
   
     ngAfterViewInit() {
       this.lectorqrService.preapare();
     }  
     
     async escanearQr(){        
       const resultado = await this.lectorqrService.escanear();       
       //@todo enviar desde
       console.info(resultado);
     }
   
     deternerScaner(){
       this.lectorqrService.stopScan();
       this.router.navigateByUrl('dashboard/listar');
     }
   
     ngOnDestroy() {
       this.lectorqrService.stopScan();
     }
   
}
