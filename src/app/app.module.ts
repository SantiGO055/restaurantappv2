import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Firebase
import { AngularFireModule } from '@angular/fire';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interception, NotificationService } from './services/notification.service';
import { environment } from '../environments/environment';
import { NgxSpinnerModule } from "ngx-spinner";
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { SysErrorHandler } from './services/sysErrorHandler';
import { UserNamePipe } from './pipes/user-name.pipe';

@NgModule({
  declarations: [AppComponent, UserNamePipe],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'mytestapp'),
    AngularFireAuthModule,
    AngularFirestoreModule, 
    IonicStorageModule.forRoot(),
    HttpClientModule,
    NgxSpinnerModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HTTP_INTERCEPTORS,useClass: Interception, multi: true},
    { provide: ErrorHandler, useClass: SysErrorHandler },
  ],
  bootstrap: [AppComponent],

  
})
export class AppModule {}
