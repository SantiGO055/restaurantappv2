import { Component, OnInit } from '@angular/core';
import { LectorQRMesaService } from '../../services/lectorqrmesa.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { User } from '../../entities/user';
import { Mesa } from '../../entities/mesa';
import { Cliente } from '../../entities/cliente';
import { MesasService } from '../../services/mesas.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-asignacion-mesa',
  templateUrl: './asignacion-mesa.page.html',
  styleUrls: ['./asignacion-mesa.page.scss'],
})
export class AsignacionMesaPage implements OnInit {


  constructor(
    public lectorqrService:LectorQRMesaService,    
    public loginService:LoginService,
    public mesaService : MesasService,
    public router:Router,
    public toastService:ToastService, 
  ) {   
  }
  
  irAResultadosEncuestas(){
    this.router.navigateByUrl('/dashboard/resultados-encuesta');
  }

  ngOnInit() {
    this.loginService.loguedUser.subscribe(user=>{
      if(User.puedeAccederMenu(user)){
        // ya lo aceptaron
        this.router.navigateByUrl('/dashboard/menu');
      }
    })
  }

  ngAfterViewInit() {
    this.lectorqrService.preapare();    
  }    

  async escanearQr()
  {
    this.lectorqrService.escanear().then(
      mesaUid => {    
         this.solicitarAsignarMesa(mesaUid);
      }
    );                       
  }

  protected solicitarAsignarMesa(mesaUid:string){
    this.loginService.loguedUser.subscribe(user => {
      const cliente  =  Cliente.fromUser(user);            
      try{
        this.mesaService.asignarMesa(mesaUid,cliente);
        this.router.navigateByUrl('/dashboard/menu');
      }catch(error){
        // informar del error 
        this.toastService.presentDanger(error);
      }      
    });
  }

  async suponerEscaneoMesa1()
  { 
      this.solicitarAsignarMesa('swUDyLwV8OFFxZnJORp5');
  }

  async suponerEscaneoMesa2()
  { 
      this.solicitarAsignarMesa('xkbC3DQSKxibJ9KzAOG2');
  }

  deternerScaner(){
    this.lectorqrService.stopScan();
  }  
}
