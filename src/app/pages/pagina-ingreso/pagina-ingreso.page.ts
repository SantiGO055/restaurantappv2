import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../../services/turnos.service';
import { LoginService } from '../../services/login.service';
import { Cliente } from '../../entities/cliente';
import { Turno } from '../../entities/turno';
import { User } from '../../entities/user';
import {  LectorQrListaEsperaService } from '../../services/lectorqrlistaespera.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-pagina-ingreso',
  templateUrl: './pagina-ingreso.page.html',
  styleUrls: ['./pagina-ingreso.page.scss'],
})
export class PaginaIngresoPage implements OnInit {
  

  constructor(
    public lectorqrService:LectorQrListaEsperaService,
    public turnosService:TurnosService,
    public loginService:LoginService,
    public userService:UsersService,
    public router:Router,
  ) {       
  }

  //en esta pagina se ve los botones de encuesta o de scanear eq

  ngOnInit() {
    this.loginService.loguedUser.subscribe(user=>{
      if(User.puedeAccederAsignarMesa(user)){
        this.redireccionAMesa();
      }
    })
  }

  protected redireccionAMesa(){
    this.router.navigateByUrl('/dashboard/asignacion-mesa');
  }

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
    this.loginService.loguedUser.subscribe(
      user => {
        const cliente = Cliente.fromUser(user);
        this.userService.moverAListaEspera(cliente);
        const turno = Turno.fromUser(cliente);
        this.turnosService.save(turno,null);
        this.redireccionAMesa();
      }
    );
  }

}
