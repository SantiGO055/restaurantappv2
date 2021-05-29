import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus, init } from 'emailjs-com';
import { Usuario } from '../entities/usuario';


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  
  constructor() {
    init("user_E6lUfQNLblPkdsA4OSKpD");
   }

  public sendEmail(user: Usuario,mensaje: string) {
    let templateParams =  {
      from_name: 'Lo de Tito',
      to_name: user.name,
      message: mensaje,
      to_email: user.email,

    }
      console.log(user);
      console.log(templateParams);
      

    emailjs.send('service_r4gna47', 'template_v3mqgrm', templateParams)
      .then((result: EmailJSResponseStatus) => {

        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    
  }
  
  
}