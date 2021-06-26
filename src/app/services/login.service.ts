import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { LoginTestData } from '../entities/loginTestData';
import { SysError } from '../entities/sysError';
import { USUARIOS_TEST } from '../../seed/usuarios';
import { User } from '../entities/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, switchMap } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { UsersService } from './users.service';
import { Rol } from '../enums/rol';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public isLogged: any = false;

  protected usuariosTest: LoginTestData[];

  protected user$: Observable<User>;
  public usuarioLogueado: Promise<User>;
  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private push: NotificationService,
    private usersService: UsersService
  ) {
    fireAuth.authState.subscribe((user) => (this.isLogged = user));
    //@todo tomar del servicio de usuario
    this.user$ = this.fireAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.fireStore.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }
  
  async registerUser(user:User, password:string): Promise<User> {
    try {
      const authData = await this.fireAuth.createUserWithEmailAndPassword(
        user.email,
        password
      );    
      user.uid = authData.user.uid;       
      //@todo tira un error que no puedo ubicar  por intentar loguearlo.
      return user;
    } catch (error) {
      //throw new SysError('Ocurrio al comunicarse con el servidor', error);
    }
  }

  async  actualUser(): Promise<User> {    
    return this.fireAuth.currentUser.then( dbUser => {       
      if(!dbUser){
        return null;
      }
      return this.usersService.getOne(dbUser.uid);
    } );   
  }

  isLoggedIn() {
    return this.fireAuth.authState.pipe(first()).toPromise();
  }

  async resetPassword(postData: { username: string }): Promise<void> {
    try {
      return this.fireAuth.sendPasswordResetEmail(postData.username);
    } catch (error) {
      throw new SysError('Ocurrio al comunicarse con el servidor', error);
    }
  }

  async loginAnonimo(displayName: string, dni:string, photoURL: string): Promise<User> {
    try {
      const authData = await this.fireAuth.signInAnonymously();
      let user = User.fromAuth(authData.user, Rol.CLIENTE, photoURL);
      user.displayName = displayName;
      user.dni = dni;
      this.usersService.save(user, user.uid);
      return user;
    } catch (error) {
      throw new SysError('Ocurrio al comunicarse con el servidor', error);
    }
  }

  async login(postData: { username: string; password: string }) {
    try {
      const authData = await this.fireAuth.signInWithEmailAndPassword(
        postData.username,
        postData.password
      );
      const usuario = await this.usersService.getOne(authData.user.uid);   
      this.usuarioLogueado = this.usersService.getOne(usuario.uid);

      this.push.guardarTokenFirebase(usuario);
      return usuario;
    } catch (error) {
      throw new SysError(this.handleErrorMessage(error.code));
    }
  }

  //@todo agregar todos los codigos de error https://firebase.google.com/docs/auth/admin/errors
  handleErrorMessage(code: string): string {
    let msg = 'error no identificado';
    if (code == 'auth/user-not-found') {
      msg = 'El usuario no existe';
    }
    return msg;
  }

  async logout(): Promise<void> {
    try {
      this.fireAuth.signOut();
    } catch (error) {
      throw error;
    }
  }

  isEmailVerified(user: User): boolean {
    return user.emailVerified === true ? true : false;
  }

  getUsuariosTest(): LoginTestData[] {
    return USUARIOS_TEST;
  }

  getUsuarioTest(username: string): LoginTestData {
    const users = this.getUsuariosTest();
    return users.find((data: LoginTestData) => data.username == username);
  }
}
