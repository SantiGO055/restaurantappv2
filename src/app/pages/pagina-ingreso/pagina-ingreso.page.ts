import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../../services/turnos.service';
import { LoginService } from '../../services/login.service';
import { Cliente } from '../../entities/cliente';
import { Turno } from '../../entities/turno';
import { clienteEstado } from '../../enums/clienteEstados';
import { User } from '../../entities/user';
import { LectorQRMesaService } from '../../services/lectorqrmesa.service';
import {  LectorQrListaEsperaService } from '../../services/lectorqrlistaespera.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-ingreso',
  templateUrl: './pagina-ingreso.page.html',
  styleUrls: ['./pagina-ingreso.page.scss'],
})
export class PaginaIngresoPage implements OnInit {

  public mostrarQrListaEspera:boolean;
  

  constructor(
    public lectorqrListaEsperaService:LectorQrListaEsperaService,
    public turnosService:TurnosService,
    public loginService:LoginService,
    public router:Router,
  ) {   
    this.mostrarQrListaEspera = true;
  }

  //en esta pagina se ve los botones de encuesta o de scanear eq

  ngOnInit() {
    this.loginService.loguedUser.subscribe(user=>{
      if(User.puedeAccederAsignarMesa(user)){
        // ya lo aceptaron
        this.router.navigateByUrl('/asignacion-mesa');
      }else{
        //debe esperar 
        this.mostrarQrListaEspera = User.puedeAccederAListaEspera(user);      
      }
    })
  }

  ngAfterViewInit() {
    this.lectorqrListaEsperaService.preapare();    
  }  
  

  async escanearQRListaEspera()
  {
    const resultado = await this.lectorqrListaEsperaService.escanear();               
    if(resultado){
        this.mostrarQrListaEspera = false;        
    }
  }

  deternerScaner(){
    this.lectorqrListaEsperaService.stopScan();
  }
  
  async escanearQRAsginarMesa(){
    //@todo completar con la lectura y demas 
  }

  protected agregarAListaEspera(){    
    //@todo revisar esto , pero entiendo que pasaria el cliente 
    this.loginService.loguedUser.subscribe(
      user => {
        const cliente  =  Cliente.fromUser(user);
        const turno = new Turno(cliente.uid);
        this.turnosService.save(turno,null);
      }
    );
  }

}
