import { Injectable } from '@angular/core';
import { Registro } from '../entities/registro';
import { AngularFirestore, AngularFirestoreCollection,} from '@angular/fire/firestore';
import { map, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {  waitForAsync } from '@angular/core/testing';
import { Turno } from '../entities/turno';

@Injectable({
  providedIn: 'root',
})
export class TurnosService {

  readonly COLLECTION = 'awaitLists';

  turnos: Observable<Turno[]>;
  private turnosCollection: AngularFirestoreCollection<Turno>;

  constructor(private readonly fireStore: AngularFirestore) {
    this.turnosCollection = fireStore.collection<Turno>(this.COLLECTION);
    this.getTurnos();
  }
  
valueChange(turnoId:string):Observable<Turno>{
  return this.fireStore.doc<Turno>(`${this.COLLECTION}/${turnoId}`).valueChanges();
}

  delete(turnoId: string): Promise<void> {
    return new Promise(
      waitForAsync((resolve, rejects) => {
        try {
          const result = this.turnosCollection.doc(turnoId).delete();
          resolve(result);
        } catch (err) {
          rejects(err.message);
        }
      })
    );
  }

  async getOneByUId(uid: string): Promise<Turno>{
    let aux: Turno;
    await this.turnos
      .pipe(first())
      .toPromise()
      .then((turnos) => {
        turnos.forEach((turno) => {          
          if (turno.uid == uid) {
            aux = turno;
          }
        });
      });
    return aux;
  }


  sacarCliente(turno:Turno):Promise<void>{
    return  this.turnosCollection.doc(turno.id).delete();;      
  }

  save(turno: Turno, turnoId: string): Promise<void> {
    return new Promise((resolve, rejects) => {
        try {
          const id = turnoId ||this.getNewId();
          const data = { id, ...turno };
          const result = this.turnosCollection.doc(id).set(data);
          resolve(result);
        } catch (err) {
          rejects(err.message);
        }
      });
  }

  public getNewId():string{
    return this.fireStore.createId();
  }

  private getTurnos(): void {
    this.turnos = this.turnosCollection
      .snapshotChanges()
      .pipe(
        map((actions) => actions.map((a) => a.payload.doc.data() as Turno))
      );
  }
}
