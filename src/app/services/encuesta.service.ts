import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Encuesta } from '../entities/encuesta';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  private dbpath = '/encuestas';
  public encuestas: Observable<Encuesta[]>;
  
  encuestaCollection: AngularFirestoreCollection<Encuesta>;
  

  productosDoc: AngularFirestoreDocument<Encuesta> | undefined;
  

  
  constructor(
    public db: AngularFirestore,
    private alerta: AlertService,
    
  ) {
    
    this.encuestaCollection = db.collection(this.dbpath);
    this.encuestas = this.encuestaCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Encuesta;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  addEncuesta(encuesta: Encuesta){
    encuesta.id = this.db.createId();
    return this.encuestaCollection.add(JSON.parse(JSON.stringify(encuesta)));

  }
  getEncuestas() {
    return this.encuestas;
  }
}
