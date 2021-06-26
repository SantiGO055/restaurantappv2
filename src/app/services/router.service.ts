import { Injectable } from '@angular/core';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor() { }
  
  public definirRutaUsuario(usuario:User):string{
    //Si es cliente 
    let route = '/dashboard/pagina-ingreso';            
    if(User.perteneceAEmpresa(usuario)){
      //si pertenece a la empresa
      route = '/dashboard/home';
    }else if(User.puedeAccederEsperaElaboracion(usuario)){
      //si es cliente ya tiene mesa y espera a que elaboren 
      route = '/dashboard/pagina-espera-elaboracion';            
    }else if(User.puedeAccederMenu(usuario)){
      //si es cliente ya tiene mesa y espera a que elaboren 
      route = '/dashboard/menu';            
    }else if(User.puedeAccederAsignarMesa(usuario)){
      //si es cliente  que ya paso  y puede asignarse mesa
      route = '/dashboard/asignacion-mesa';            
    }
    return route;
  }
}
