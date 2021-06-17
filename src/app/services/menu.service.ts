import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pedido } from '../entities/pedido';
import { Producto } from '../entities/producto';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private dbpath = '/productos';
  private dbpathPedido = '/pedidos';
  public productos: Observable<Producto[]>;
  public pedidos: Observable<Pedido[]>;
  productosCollection: AngularFirestoreCollection<Producto>;
  pedidosCollection: AngularFirestoreCollection<Pedido>;

  productosDoc: AngularFirestoreDocument<Producto> | undefined;
  pedidosDoc: AngularFirestoreDocument<Pedido> | undefined;

  
  constructor(
    public db: AngularFirestore,
    private alerta: AlertService,
    
  ) {
    this.productosCollection = db.collection(this.dbpath);
    this.productos = this.productosCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Producto;
        data.uid = a.payload.doc.id;
        return data;
      });
    }));
    this.pedidosCollection = db.collection(this.dbpathPedido);
    this.pedidos = this.pedidosCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Pedido;
        data.uid = a.payload.doc.id;
        return data;
      });
    }));
   }

   getAllProductos(){
     
     return this.productos;
   }
   addPedido(pedido: Pedido){
     pedido.uid = this.db.createId();
    return this.pedidosCollection.add(JSON.parse(JSON.stringify(pedido)));
   }
   getAllPedidos(){
     return this.pedidos;
   }
   updatePedido(pedido: Pedido){
    this.pedidosDoc = this.db.doc(`pedidos/${pedido.uid}`);
    return this.pedidosDoc.update(pedido);
   }




}
