import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../../services/turnos.service';
import { LoginService } from '../../services/login.service';
import { Cliente } from '../../entities/cliente';
import { Turno } from '../../entities/turno';
import { clienteEstado } from '../../enums/clienteEstados';
import { User } from '../../entities/user';

@Component({
  selector: 'app-pagina-ingreso',
  templateUrl: './pagina-ingreso.page.html',
  styleUrls: ['./pagina-ingreso.page.scss'],
})
export class PaginaIngresoPage implements OnInit {

  public mostrarQrMesa:boolean;
  public mostrarQrListaEspera:boolean;

  constructor(
    public turnosService:TurnosService,
    public loginService:LoginService,
  ) { 
    this.mostrarQrListaEspera = true;
    this.mostrarQrListaEspera = false;    
  }

  //en esta pagina se ve los botones de encuesta o de scanear eq

  ngOnInit() {
    this.loginService.loguedUser.subscribe(
      user =>{
        this.mostrarQrListaEspera = User.puedeAccederAListaEspera(user);
        this.mostrarQrMesa = User.puedeAccederAListaEspera(user);
      }
    );
    
  }


  escanearQRListaEspera()
  {
    // @todo completar 
    this.mostrarQrListaEspera = false;
    this.mostrarQrMesa = true;
  }

  escanearQRAsginarMesa(){
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
