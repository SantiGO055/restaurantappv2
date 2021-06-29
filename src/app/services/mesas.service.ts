import { Injectable } from '@angular/core';
import { Mesa } from '../entities/mesa';
import { AngularFirestore, AngularFirestoreCollection,} from '@angular/fire/firestore';
import { map, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {  waitForAsync } from '@angular/core/testing';
import { Cliente } from '../entities/cliente';
import { SysError } from '../entities/sysError';
import { Turno } from '../entities/turno';

@Injectable({
  providedIn: 'root',
})
export class MesasService {
  
  readonly COLLECTION = 'mesas';

  mesas: Observable<Mesa[]>;
  private mesasCollection: AngularFirestoreCollection<Mesa>;

  constructor(private readonly fireStore: AngularFirestore) {
    this.mesasCollection = fireStore.collection<Mesa>(this.COLLECTION);
    this.getMesas();
  }
  
  delete(registroId: string): Promise<void> {
    return new Promise(
      waitForAsync((resolve, rejects) => {
        try {
          const result = this.mesasCollection.doc(registroId).delete();
          resolve(result);
        } catch (err) {
          rejects(err.message);
        }
      })
    );
  }
  
  

  save(mesa: Mesa, registroId: string): Promise<void> {
    return new Promise((resolve, rejects) => {
        try {
          const id = registroId || this.fireStore.createId();
          const data = { id, ...mesa };
          const result = this.mesasCollection.doc(id).set(data);
          resolve(result);
        } catch (err) {
          rejects(err.message);
        }
      });
  }

  private getMesas(): void {
    this.mesas = this.mesasCollection
      .snapshotChanges()
      .pipe(
        map((actions) => actions.map((a) => a.payload.doc.data() as Mesa))
      );
  }

  async getOneByUId(uid: string): Promise<Mesa>{
    let aux: Mesa;
    await this.mesas
      .pipe(first())
      .toPromise()
      .then((mesas) => {
        mesas.forEach((mesa) => {                 
          if (mesa.uid == uid) {
            aux = mesa;
          }
        });
      });
    return aux;
  }

  async getOneById(id: string): Promise<Mesa>{
    let aux: Mesa;
    await this.mesas
      .pipe(first())
      .toPromise()
      .then((mesas) => {
        mesas.forEach((mesa) => {                 
          if (mesa.id == id) {
            aux = mesa;
          }
        });
      });
    return aux;
  }


  async tomarMesa(mesaId:string, cliente:Cliente)
  {    
    let mesa =  await this.getOneById(mesaId);    
    if(!mesa){
      throw new SysError('No existe la mesa');
    }    
    //@todo revisar si esta mesa no es de otra persona 
    if(mesa.uid && mesa.uid != cliente.uid){
      throw new SysError('La mesa se encuentra asignada a otro cliente');
    }else if(Cliente.tieneMesa(cliente)){
      throw new SysError('Esta no es la mesa que tiene asignada.');
    }   
  }
  
  async asignarMesaPorTurno(mesa:Mesa,turno:Turno){
    mesa.uid = turno.uid ;    
    this.save(mesa,mesa.id);
  }

}
