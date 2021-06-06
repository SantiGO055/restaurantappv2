import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { LoginTestData } from '../entities/loginTestData';
import { SysError } from '../entities/sysError';
import { USUARIOS_TEST } from '../../seed/usuarios';
import { User } from '../entities/user';
import { AngularFireAuth } from '@angular/fire/auth';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { first, switchMap } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  
  public isLogged: any = false;
  
  protected usuariosTest:LoginTestData[];

  public user$: Observable<User>;

  constructor(    
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private push: NotificationService
  ) {
    fireAuth.authState.subscribe(user => (this.isLogged = user));
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

  isLoggedIn() {
    return this.fireAuth.authState.pipe(first()).toPromise();
  } 

  async resetPassword(postData: {username: string}): Promise<void> {
    try {
      return this.fireAuth.sendPasswordResetEmail(postData.username);
    } catch (error) {
      throw new SysError('Ocurrio al comunicarse con el servidor', error);
    }
  }

async loginAnonimo(displayName: string, photoURL:string): Promise<User> {
  try {    
    const  authData  = await this.fireAuth.signInAnonymously();                  
    const user =  {
      uid: authData.user.uid,
      displayName,      
      emailVerified: authData.user.emailVerified, 
      photoURL ,
    } as User; 
    this.updateUserData(user);
    return user;
  } catch (error) {
    throw new SysError('Ocurrio al comunicarse con el servidor', error);
  }
}


  async login(postData: { username: string; password: string }) {
    try {
      const authData = await this.fireAuth.signInWithEmailAndPassword(postData.username,postData.password);
      console.log(authData.user);
      this.push.guardarTokenFirebase(authData.user);

    } catch (error) {                    
      throw new SysError(this.handleErrorMessage(error.code));
    }
  }

  
   //@todo agregar todos los codigos de error https://firebase.google.com/docs/auth/admin/errors  
  handleErrorMessage( code:string ):string{
    let msg = 'error no identificado';
    if(code == 'auth/user-not-found'){
      msg = 'El usuario no existe';
    }
    return  msg;
  }
  

  async logout(): Promise<void> {
    try {
      this.fireAuth.signOut();
    } catch (error) {
      throw error;
    }
  }

// @todo PASAR AL SERVICIO DE USUARIO
  private updateUserData(user:User) {
    const userRef: AngularFirestoreDocument<User> = this.fireStore.doc(
      `users/${user.uid}`
    );
    return userRef.set(user, { merge: true });
  }

  isEmailVerified(user:User):boolean
  {
    return user.emailVerified === true ? true: false;
  }

  getUsuariosTest(): LoginTestData[] {
    return USUARIOS_TEST;
  }

  getUsuarioTest(uid: string): LoginTestData {
    const users = this.getUsuariosTest();
    return users.find((data: LoginTestData) => data.uid == uid);
  }

}
