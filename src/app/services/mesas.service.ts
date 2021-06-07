import { Injectable } from '@angular/core';
import { Mesa } from '../entities/mesa';
import { AngularFirestore, AngularFirestoreCollection,} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {  waitForAsync } from '@angular/core/testing';

@Injectable({
  providedIn: 'root',
})
export class MesasService {
  readonly COLLECTION = 'tables';

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
}
