import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument, } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { waitForAsync } from '@angular/core/testing';
import { User } from '../entities/user';
import { first, map } from 'rxjs/operators';
import { SysError } from '../entities/sysError';
import { clienteEstado } from '../enums/clienteEstados';
import { Cliente } from '../entities/cliente';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  readonly COLLECTION = 'users';

  usuarios: Observable<User[]>;
  private usuariosCollection: AngularFirestoreCollection<User>;
  usuariosDoc: AngularFirestoreDocument<User> | undefined;

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
  update(usuario: User){
    this.usuariosDoc = this.fireStore.doc(`users/${usuario.uid}`);
    return this.usuariosDoc.update(usuario);
  }

  marcarEncuestaRealizada(cliente:Cliente):Promise<void>{
    cliente.completoEncuesta = true;
    return this.save(cliente,cliente.uid);
   }


  async moverAListaEspera(uid:string):Promise<void>{
    const user = await this.getOne(uid);
    if(!User.esCliente(user)) {
      throw new SysError('Debe ser cliente para ingresar a la lista de espera.');
    } 
    user.estado = clienteEstado.EN_LISTA_ESPERA;     
    return this.save(user,user.uid);                
  }


  async moverATomandoMesa(uid:string):Promise<void>{
    const user = await this.getOne(uid);
    if(!User.esCliente(user)) {
      throw new SysError('Debe ser cliente para ingresar a la lista de espera.');
    } 
    if(user.estado != clienteEstado.EN_LISTA_ESPERA){
      throw new SysError('Debe haber seleccionando mesa');
    }
    user.estado = clienteEstado.TOMANDO_MESA;     
    return this.save(user,user.uid);                
  }
    

  async moverAMesaSelecionada(user:User):Promise<void>{
    if(!User.esCliente(user)) {
      throw new SysError('Debe ser cliente para ingresar a la lista de espera.');
    }
    if(user.estado != clienteEstado.TOMANDO_MESA){
      throw new SysError('Debe haber seleccionando mesa');
    }
    user.estado = clienteEstado.MESA_SELECCIONADA;
    return this.save(user,user.uid);      
  }

  async moverAEsperandoPedido(user:User):Promise<void>{
    if(!User.esCliente(user)) {
      throw new SysError('Debe ser cliente para ingresar a la lista de espera.');
    }
    if(user.estado != clienteEstado.MESA_SELECCIONADA){
      throw new SysError('Debe tener una mesa asignada');
    }
    user.estado = clienteEstado.ESPERANDO_PEDIDO;
    return this.save(user,user.uid);      
  }


  async moverAConsumiendo(user:User):Promise<void>{
    if(!User.esCliente(user)) {
      throw new SysError('Debe ser cliente para ingresar a la lista de espera.');
    }
    if(user.estado != clienteEstado.ESPERANDO_PEDIDO){
      throw new SysError('Debe haber solicitado el pedido');
    }
    user.estado = clienteEstado.CONSUMIENDO;
    return this.save(user,user.uid);      
  }

  moverEsperandoFactura(user:User){
    if(!User.esCliente(user)) {
      throw new SysError('Debe ser cliente para solicitar el pago.');
    }
    if(user.estado != clienteEstado.CONSUMIENDO){
      throw new SysError('Debe haber confirmado al recepción del pedido');
    }
    user.estado = clienteEstado.ESPERANDO_CUENTA;
    return this.save(user,user.uid);      
  }

  moverEsperandoVisitoHoy(user:User){
    if(!User.esCliente(user)) {
      throw new SysError('Debe ser cliente para solicitar el pago.');
    }
    if(user.estado != clienteEstado.ESPERANDO_CUENTA){
      throw new SysError('Debe haber pedido la cuenta');
    }
    user.estado = clienteEstado.VISITO_HOY;
    return this.save(user,user.uid);      
  }


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
          if (user.uid == uid) {
            userAux = user;
          }
        });
      });
    return userAux;
  }

  async getOne2(uid: string) {
    return this.usuariosCollection.doc(uid).valueChanges().pipe(first());
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
