import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection, } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { waitForAsync } from '@angular/core/testing';
import { User } from '../entities/user';
import { first, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  readonly COLLECTION = 'users';

  usuarios: Observable<User[]>;
  private usuariosCollection: AngularFirestoreCollection<User>;

  constructor(private readonly fireStore: AngularFirestore) {
    this.usuariosCollection = fireStore.collection<User>(this.COLLECTION);
    this.getRegistros();
  }

  delete(registroId: string): Promise<void> {
    return new Promise(
      waitForAsync((resolve, rejects) => {
        try {
          const result = this.usuariosCollection.doc(registroId).delete();
          resolve(result);
        } catch (err) {
          rejects(err.message);
        }
      })
    );
  }
  
  //@todo revisar si eliminarlo
  async getUser(uid: string) {
    return this.getOne(uid);
  }

  async getOne(uid: string) {
    let userAux: User;
    await this.usuarios
      .pipe(first())
      .toPromise()
      .then((usuarios) => {
        usuarios.forEach((user) => {
          console.log(user.uid , uid);
          if (user.uid == uid) {
            userAux = user;
          }
        });
      });
    return userAux;
  }

  save(user: User, userId: string): Promise<void> {
    return new Promise((resolve, rejects) => {
      try {
        const uid = userId || this.fireStore.createId();
        const data = { uid, ...user };
        const result = this.usuariosCollection.doc(uid).set(data);
        resolve(result);
      } catch (err) {
        rejects(err.message);
      }
    });
  }

  private getRegistros(): void {
    this.usuarios = this.usuariosCollection
      .snapshotChanges()
      .pipe(map((actions) => actions.map((a) => a.payload.doc.data() as User)));
  }
}
