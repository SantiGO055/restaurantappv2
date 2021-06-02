import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { LoginTestData } from '../entities/loginTestData';
import { SysError } from '../entities/sysError';
import { USUARIOS_TEST } from '../../seed/usuarios';
import { User } from '../entities/user';
import { AngularFireAuth } from '@angular/fire/auth';
//import auth from 'firebase/firebase-auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { first, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  
  protected usuariosTest:LoginTestData[];

  public user$: Observable<User>;

  constructor(    
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore
  ) {
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
/*
  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.fireAuth.signInWithPopup(
        new auth.GoogleAuthProvider()        
      );      
      this.updateUserData(user);
      return user;
    } catch (error) {
      throw new SysError('Ocurrio al comunicarse con el servidor', error);
    }
  }
*/
async loginAnonimo(nombre: string, photoURL:string): Promise<User> {
  try {
    const { user } = await this.fireAuth.signInAnonymously();      
    user.displayName = nombre;
    user.photoURL = photoURL;
    this.updateUserData(user);
    return user;
  } catch (error) {
    throw new SysError('Ocurrio al comunicarse con el servidor', error);
  }
}


  async sendVerificationEmail(): Promise<void> {
    try {
      return (await this.fireAuth.currentUser).sendEmailVerification();
    } catch (error) {
      throw new SysError('Ocurrio al comunicarse con el servidor', error);
    }
  }

  async register(postData: {username: string;password: string;}): Promise<User> {
    try {
      const { user } = await this.fireAuth.createUserWithEmailAndPassword(
        postData.username,
        postData.password
      );
      this.sendVerificationEmail();
      return user;
    } catch (error) {
      throw new SysError('Ocurrio al comunicarse con el servidor', error);
    }
  }

  async login(postData: { username: string; password: string }): Promise<User> {
    try {
      const { user } = await this.fireAuth.signInWithEmailAndPassword(
        postData.username,
        postData.password
      );      
      this.updateUserData(user);      
      return user;
    } catch (error) {
      //@todo agregar todos los codigos de error https://firebase.google.com/docs/auth/admin/errors
      if(error.code == 'auth/user-not-found'){
        throw  'El usuario no existe ';
      }
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      this.fireAuth.signOut();
    } catch (error) {
      throw error;
    }
  }


  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.fireStore.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
    };

    return userRef.set(data, { merge: true });
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
