import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { asapScheduler } from 'rxjs';
import { Usuario } from 'src/app/entities/usuario';
import { EmailService } from 'src/app/services/email.service';
import { SpinnerService } from '../../services/spinner.service';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';

const { PushNotifications } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  public folder: string;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    public spinnerService:SpinnerService,
    private emailjs: EmailService,
    
    ) { 
    
  }

  ngOnInit() {
    this.spinnerService.mostrarSpinner();
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    

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
        
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        
      }
    );
    
  }
  enviarMail(){
    let usuario:Usuario= {
      id: 1,
      name: 'Santi Prueba',
      email: 'santigonzalez05@gmail.com',
      photo: 'asd'
    }
    this.emailjs.sendEmail(usuario,'El usuario ha sido activado');
  }
}

