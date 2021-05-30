import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  push(){
    // this.http.post("https://fcm.googleapis.com/fcm/send")
  }
  
  
}
