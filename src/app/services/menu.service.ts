import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from '../entities/producto';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private dbpath = '/productos';
  public productos: Observable<Producto[]>;
  productosCollection: AngularFirestoreCollection<Producto>;

  productosDoc: AngularFirestoreDocument<Producto> | undefined;

  
  constructor(
    public db: AngularFirestore,
    private alerta: AlertService
  ) {
    this.productosCollection = db.collection(this.dbpath);
    this.productos = this.productosCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Producto;
        data.uid = a.payload.doc.id;
        return data;
      });
    }));
   }

   getAllProductos(){
     
     return this.productos;
   }




}
