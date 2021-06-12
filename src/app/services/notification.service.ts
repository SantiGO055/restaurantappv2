import { HttpClient,HttpEvent,HttpHandler,HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';

import {Plugins,PushNotification,PushNotificationToken,PushNotificationActionPerformed,Capacitor} from '@capacitor/core';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { TokenNotification } from '../entities/tokennotification';
import { User } from '../entities/user';
import { LoginService } from './login.service';
import { ToastService } from './toast.service';

const { PushNotifications } = Plugins;

const isPushNotificationsAvailable =
  Capacitor.isPluginAvailable('PushNotifications');

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  token: PushNotificationToken;

  /** al momento de loguear un usuario, guardar en la base el token con la data del usuario logueado,
   * entonces cuando se quiera enviar una notificacion obtengo a que rol quiero enviarla y obtengo el token de ese celu segun el rol */
  tokenNotifCollection: AngularFirestoreCollection<TokenNotification>;
  notifDoc: AngularFirestoreDocument<TokenNotification> | undefined;

  private dbpath = '/tokenNotification';
  public tokenNotif: Observable<TokenNotification[]>;
  public tokens: TokenNotification[] = [];
  tokenArr: string[] = [];
  constructor(
    private http: HttpClient,
    private toast: ToastService,
    public db: AngularFirestore,
    private loginSvc: LoginService,
    private fireStore: AngularFirestore
  ) {
    this.tokenNotifCollection = db.collection(this.dbpath);
    this.tokenNotif = this.tokenNotifCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as TokenNotification;
          data.uid = a.payload.doc.id;
          return data;
        });
      })
    );
    if (isPushNotificationsAvailable) {
      this.initPushNotifications();
    }
  }

  initPushNotifications() {
    PushNotifications.requestPermission().then((result) => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        // console.log(token);
        this.token = token;
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {});

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotification) => {
        // console.log("notificacion recibida: " + JSON.stringify(notification));
        this.toast.presentSuccess('Notificacion recibida');
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        // console.log(notification);
      }
    );
  }

  getTokenDevice() {
    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        // console.log(token);
        this.token = token;
      }
    );
    return this.token;
  }
  getAllTokens() {
    return this.tokenNotif;
  }
  obtenerTokenIgual(token: TokenNotification[]){
    
    
    // let retorno = false;
    // for (let i = 0; i < token.length; i++) {
     
    //   if(token[i].token == this.token.value){
    //     retorno = false;
    //     return false;
    //   }
    //   else{
    //     retorno = true;
    //   }
      
    // }
    // return retorno;
  }

  // guardarTokenFirebase(user: User){
    // let asd = this.db.collection(this.dbpath,ref=>ref.where('token','==',this.token.value)).valueChanges()
    //     asd.pipe(first())
    //     .toPromise()
    //     .then((tokensBase)=>{
          
    //       if(tokensBase.length>0){
    //         console.log("no tengo que agregar sino updatear")
    //         let tokenObj: TokenNotification = {
    //           token: this.getTokenDevice().value,
    //           usuario: user,
    //         };
    //         tokensBase.forEach(tok => {
    //           console.log(tok)
    //         });
    //       }
    //       else{
    //         console.log("tengo que agregar");
    //         let tokenObj: TokenNotification = {
    //           token: this.getTokenDevice().value,
    //           usuario: user,
    //         };
    //         //@todo ver si esto se tiene que borrar
    //         this.addToken(tokenObj).then(result=>{
    //           tokenObj.uid = result.id;
    //           this.updateToken(tokenObj);
    //         })
    //       }
    //     })
  // }
  buscarToken(token: TokenNotification[]){
    // let asd = this.db.collection(this.dbpath,ref=>ref.where('token','==',this.token.value)).valueChanges()
    //     asd.pipe(first())
    //     .toPromise()
    //     .then((tokensBase)=>{
    //     });
    let objAux = {
      retorno: false,
      token: null
    };
   for(let tok of token){
      if(tok.token == this.getTokenDevice().value){
        objAux = {
          retorno: true,
          token: <TokenNotification>tok
        }

        break;
      }
      else{
        objAux = {
          retorno: false,
          token: null
        }
      }
    };
    return objAux;
  }
  guardarTokenFirebase(user: User) {  
    try {
      
      let diAlta: boolean = false;
      this.getAllTokens()
        .pipe(first())
        .toPromise()
        .then((tokens) => {
          let obj = this.buscarToken(tokens);

          if(obj.retorno){
            obj.token.usuario = user;
            console.log(obj);
            this.updateToken(obj.token);

          }
          else{
            let tokenObj: TokenNotification = {
              token: this.getTokenDevice().value,
              usuario: user,
            };
            this.addToken(tokenObj)
          }
          
        });
    } catch (error) {
      
    }  
  }

  addToken(token: TokenNotification) {
    return this.tokenNotifCollection.add(JSON.parse(JSON.stringify(token)));
  }
  updateToken(token: TokenNotification) {
    const userRef: AngularFirestoreDocument<TokenNotification> =
      this.fireStore.doc(`tokenNotification/${token.uid}`);
    return userRef.set(token, { merge: true });
  }

  
  deleteToken(token: TokenNotification) {
    this.notifDoc = this.db.doc(`mensajes/${token.uid}`);
    this.notifDoc.delete();
  }

  public push(title: string, mensaje: string, rol: string) {
    this.tokenNotif
      .pipe(first())
      .toPromise()
      .then((tokens) => {
        if (tokens.length != 0) {
          tokens.forEach((token) => {
            if (token.usuario.rol == rol) {
              this.tokenArr.push(token.token);

              //  let arryToken = this.obtenerToken(rol);
              // console.log(token.token)
              var res: any;
              // this.tokenArr.forEach(token => {
              res = this.http.post('https://fcm.googleapis.com/fcm/send', {
                notification: {
                  title: title,
                  body: mensaje,
                  sound: true,
                  data: {
                    'google.delivered_priority': 'high',
                    'google.original_priority': 'high',
                    collapse_key: 'ar.com.github.lodetito',
                  },
                  id: '0:1622866068474675%7f8128f57f8128f5',
                },
                to: token.token,
              });
              if (
                res
                  .pipe(first())
                  .toPromise()
                  .then((a) => {
                    if (a.success == 1) {
                      return true;
                    }
                  })
              )
                return true;
              // });
            }
          });
        }
      });

    // this.http.post("https://fcm.googleapis.com/fcm/send")
  }
}
export class Interception {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json',
        Authorization: `key=AAAAN0j23hU:APA91bFk2jgXEeTMutQMqKjkB5s5dkEuWZh5YSWzuq1GPZZA6cf051pRUH2B0fbNEINxzf_XSMP0k3b0ASa5GzBB5Rjl5doFy5NCtjH34w6fvtzg-kTCQrvHm2vUpeprJ7Auw7X-lxV7`,
      },
    });
    return next.handle(req);
  }
}
