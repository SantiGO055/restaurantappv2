import { Rol } from '../enums/rol';
import firebase from 'firebase/app';
import { clienteEstado } from '../enums/clienteEstados';
import { Registro } from './registro';

export class User {
  uid?: string;
  email: string;
  displayName: string;
  emailVerified: boolean;
  photoURL?: string;
  rol?: string;
  mesa?: string;
  estado?: string;

  static perteneceAEmpresa(user: User): boolean {
    //@todo buscar si existe algun metodo in
    return (
      user.rol == Rol.DUENIO ||
      user.rol == Rol.SUPERVISOR ||
      user.rol == Rol.MAITRE ||
      user.rol == Rol.MOZO ||
      user.rol == Rol.COCINERO ||
      user.rol == Rol.BARTENDER
    );
  }

  static esDuenio(user: User): boolean {
    return user.rol == Rol.DUENIO;
  }

  static esMaitre(user: User): boolean {
    return user.rol == Rol.MAITRE;
  }

  static esCocinero(user: User): boolean {
    return user.rol == Rol.COCINERO;
  }
  static esBartender(user: User): boolean {
    return user.rol == Rol.BARTENDER;
  }
  static esCliente(user: User): boolean {
    return user.rol == Rol.CLIENTE;
  }

  static puedeAccederAListaEspera(user: User): boolean {
    return (
      user.rol == Rol.CLIENTE &&  user.estado == null 
    );
  }

  static puedeAccederAsignarMesa(user: User): boolean {    
    return (
      user.rol == Rol.CLIENTE && user.estado == clienteEstado.EN_LISTA_ESPERA
    );
  }

  static fromAuth(user: firebase.User, rol: Rol, photoURL: string) {
    return {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL,
      rol,
    } as User;
  }

  static fromRegistro(registro:Registro):User{
    return {        
        displayName: registro.displayName,
        email: registro.email,
        emailVerified: false,
        photoURL:registro.photoURL,
        rol:Rol.CLIENTE,
      } as User;
    }
}
