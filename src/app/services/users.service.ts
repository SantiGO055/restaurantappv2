import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { User } from '../entities/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private dbpath = '/users';
  usuariosCollection: AngularFirestoreCollection<User>;
  public usuarios: Observable<User[]>;


  constructor(public db: AngularFirestore) {
    this.usuariosCollection = db.collection(this.dbpath);
    this.usuarios = this.usuariosCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as User;
        data.uid = a.payload.doc.id;
        return data;
      });
    }));
   }
   getAllUsers(){
    return this.usuarios;
   }
   async getUser(uid: string){
     let userAux: User;
     console.log(uid)

     await this.getAllUsers().pipe(first()).toPromise().then(usuarios=>{
      usuarios.forEach(user => {
         if(user.uid == uid){
          userAux = user;
          console.log(user)
         }
       });

     });
     return userAux;

   }
}
