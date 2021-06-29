import { Component, OnInit } from '@angular/core';
import { LectorQRMesaService } from '../../services/lectorqrmesa.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { User } from '../../entities/user';
import { Cliente } from '../../entities/cliente';
import { MesasService } from '../../services/mesas.service';
import { ToastService } from '../../services/toast.service';
import { UsersService } from '../../services/users.service';

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
    public userService:UsersService,
  ) {   
  }
  
  irAResultadosEncuestas(){
    this.router.navigateByUrl('/dashboard/resultados-encuesta');
  }

  ngOnInit() {
    this.loginService.actualUser().then(user=>{
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
  async  tomarMesa(mesaUid:string){
    const user = await this.loginService.actualUser();
    const cliente  =  Cliente.fromUser(user);       
    this.mesaService.tomarMesa(mesaUid,cliente).then(
      response => {        
        this.userService.moverAMesaSelecionada(cliente).then(
          response => {
            this.router.navigateByUrl('/dashboard/pagina-espera');
          }, 
          error => {
            this.toastService.presentDanger(error);    
          }
        );            
      },
      error => {
        this.toastService.presentDanger(error);    
      }
    );        
  }

  protected solicitarAsignarMesa(mesaUid:string){
    this.loginService.actualUser().then(user => {
      const cliente  =  Cliente.fromUser(user);            
      try{        
        this.mesaService.tomarMesa(mesaUid,cliente).then(
          response => {
            //asignar al cliente el estado 
            this.userService.moverAMesaSelecionada(cliente).then(
              response => {
                this.router.navigateByUrl('/dashboard/pagina-espera');
              }, 
              error => {
                this.toastService.presentDanger(error);    
              }
            );            
          },
          error => {
            this.toastService.presentDanger(error);    
          }
        );        
      }catch(error){ 
        // informar del error 
        this.toastService.presentDanger(error);
      }      
    });
  }

  async suponerEscaneoMesa1()
  {
      this.solicitarAsignarMesa('xkbC3DQSKxibJ9KzAOG2');
  }

  async suponerEscaneoMesa2()
  { 
      this.solicitarAsignarMesa('swUDyLwV8OFFxZnJORp5');
  }

  deternerScaner(){
    this.lectorqrService.stopScan();
  }  
}
