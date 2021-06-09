import { Injectable } from '@angular/core';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor() { }


  public definirRutaUsuario(usuario:User):string{
    //Si es cliente 
    let route = '/cliente/pagina-ingreso';            
    if(User.perteneceAEmpresa(usuario)){
      //si pertenece a la empresa
      route = '/dashboard/home';
    }else if(User.puedeAccederAsignarMesa(usuario)){
      //si es cliente  que ya paso la lista de espera
      let route = '/cliente/asignacion-mesa';            
    }
    return route;
  }
}
