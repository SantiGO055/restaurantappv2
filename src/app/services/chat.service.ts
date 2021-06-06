import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ModalController } from '@ionic/angular';
import { ChatComponent } from '../components/chat/chat.component';
import { Mensaje } from '../entities/mensaje';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private dbPath = '/mensajes';
  mensajesRef: AngularFireList<Mensaje>;
  constructor(private db: AngularFireDatabase,
    private modal: ModalController) {
    this.mensajesRef = db.list(this.dbPath);
   }


  enviarMensaje(mensaje: Mensaje): any {
    return this.mensajesRef.push(mensaje);
  }

  getAllMensajes(): AngularFireList<Mensaje> {
    return this.mensajesRef;
  }

  
public async mostrarChat() {
    const modal = await this.modal.create({
      component: ChatComponent,
    });
    return await modal.present();
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modal.dismiss({
      'dismissed': true
    });
  }
}
