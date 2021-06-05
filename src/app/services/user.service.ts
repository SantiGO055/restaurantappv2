import { Injectable } from '@angular/core';
import { User } from '../entities/user';
import { AngularFireAuth } from '@angular/fire/auth';
//import auth from 'firebase/firebase-auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dbPathUser = '/users';

  usuariosDoc: AngularFirestoreDocument<User> | undefined;
  usuariosCollection: AngularFirestoreCollection<User>;
  public usuarios: Observable<User[]>;

  constructor(
    public db: AngularFirestore,
    private storage : AngularFireStorage,
  ) { 
    this.usuariosCollection = db.collection(this.dbPathUser);
    this.usuarios = this.usuariosCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as User;
        data.uid = a.payload.doc.id;
        return data;
      });
    }));
  }
  
  /**@returns Retorna un observable de todos los usuarios de la base, realizar subscribe para obtener la coleccion de ellos */
  getAllUsers(){
    return this.usuarios;
  }
  /**@param usuario de tipo User que sera el objeto a dar de alta en la base
   * @returns Data sobre el alta realizada
   */
  addUser(usuario: User){
    return this.usuariosCollection.add(JSON.parse( JSON.stringify(usuario)));
  }


}
