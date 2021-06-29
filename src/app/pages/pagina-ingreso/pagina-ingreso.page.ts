import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../../services/turnos.service';
import { LoginService } from '../../services/login.service';
import { Cliente } from '../../entities/cliente';
import { Turno } from '../../entities/turno';
import { User } from '../../entities/user';
import {  LectorQrListaEsperaService } from '../../services/lectorqrlistaespera.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { SysError } from '../../entities/sysError';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { ToastService } from '../../services/toast.service';
import { AlertService } from '../../services/alert.service';
import { takeUntil } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-pagina-ingreso',
  templateUrl: './pagina-ingreso.page.html',
  styleUrls: ['./pagina-ingreso.page.scss'],
})
export class PaginaIngresoPage implements OnInit {
  
  enListaEspera:boolean;
  turno:Observable<Turno>;

  constructor(
    public lectorqrService:LectorQrListaEsperaService,
    public turnosService:TurnosService,
    public loginService:LoginService,
    public userService:UsersService,
    public router:Router,    
    public alerta: AlertService,
  ) {       
    this.enListaEspera = false;    
  }

  //en esta pagina se ve los botones de encuesta o de scanear eq

  ngOnInit() {
   
  }
/*
  protected redireccionAMesa(){
    this.router.navigateByUrl('/dashboard/asignacion-mesa');
  }
*/
  ngAfterViewInit() {
    this.lectorqrService.preapare();    
  }    

  async escanearQr()
  {
    const resultado = await this.lectorqrService.escanear();                   
    if(resultado){    
      this.agregarAListaEspera();      
    }
  }

  async testQRValido(){
    this.agregarAListaEspera();    
  }

  deternerScaner(){
    this.lectorqrService.stopScan();
  }  

  irAResultadosEncuestas(){
    this.router.navigateByUrl('/dashboard/resultados-encuesta');
  }

  protected agregarAListaEspera(){    
    
    this.enListaEspera = true;
    const user = this.loginService.actualUser().then( user => {
        const cliente = Cliente.fromUser(user);
        this.userService.moverAListaEspera(cliente);
        const turno = Turno.fromUser(cliente);   
        const turnoId = this.turnosService.getNewId();
        this.turnosService.save(turno,turnoId).then(
          r => {
            const a = this.turnosService.valueChange(turnoId).subscribe(
              (turno:Turno) => {
                if(turno.aceptado === true){
                    this.enListaEspera = false;                    
                    this.alerta.showSucess(`Escanea el QR de la mesa ${turno.mesa}`,'Ya podes pasar','/dashboard/asignacion-mesa')                    
                    //dejar de escuchar el turno
                    a.unsubscribe();
                }
              }
            )
          }
        );        
                
    });       
  }

}
