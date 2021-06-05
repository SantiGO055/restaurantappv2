import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TokenNotification } from '../entities/tokennotification';
import { User } from '../entities/user';
import { ToastService } from './toast.service';

const { PushNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  token: PushNotificationToken;


  /** al momento de loguear un usuario, guardar en la base el token con la data del usuario logueado, 
   * entonces cuando se quiera enviar una notificacion obtengo a que rol quiero enviarla y obtengo el token de ese celu segun el rol */
  tokenNotifCollection: AngularFirestoreCollection<TokenNotification>;
  private dbpath = '/tokenNotification';
  public tokenNotif: Observable<TokenNotification[]>;
  constructor(private http: HttpClient,
    private toast: ToastService,
    public db: AngularFirestore
    ) {

      this.tokenNotifCollection = db.collection(this.dbpath);
      this.tokenNotif = this.tokenNotifCollection.snapshotChanges().pipe(map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data() as TokenNotification;
          data.id = a.payload.doc.id;
          return data;
        });
      }));




    PushNotifications.requestPermission().then( result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        console.log(token);
        this.token = token;
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',async(notification: PushNotification) => {
        console.log("notificacion recibida: " + JSON.stringify(notification));
        this.toast.presentSuccess("Notificacion recibida");
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        console.log(notification);
      }
    );
   }
   guardarTokenFirebase(user: User, token: string){
    let tokenObj:TokenNotification = {
      token: token,
      usuario: user
    }

    return this.tokenNotifCollection.add(JSON.parse( JSON.stringify(tokenObj)));
   }

  public push(title:string,mensaje:string,token?: string){
    
    let res = this.http.post("https://fcm.googleapis.com/fcm/send",
    {
      "notification":{
          "title":title,
          "body": mensaje,
          "sound": true,
          "data":{
              "google.delivered_priority": "high",
              "google.original_priority": "high"
          }
      },
      "to": token,
      
    }
    ).pipe(tap(asd=>{
      console.log(asd);
    }))
    console.log(res);
    return res;
    
    // this.http.post("https://fcm.googleapis.com/fcm/send")
  }
  
  
}
export class Interception{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': `key=AAAAN0j23hU:APA91bFk2jgXEeTMutQMqKjkB5s5dkEuWZh5YSWzuq1GPZZA6cf051pRUH2B0fbNEINxzf_XSMP0k3b0ASa5GzBB5Rjl5doFy5NCtjH34w6fvtzg-kTCQrvHm2vUpeprJ7Auw7X-lxV7`,
      },
      
    });
    return next.handle(req);
  }
}
