import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus, init } from 'emailjs-com';
import { Usuario } from '../entities/usuario';


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  
  constructor() { }

  public sendEmail(user: Usuario,mensaje: string) {
    let templateParams =  {
      from_name: 'Lo de Tito',
      to_name: user.name,
      message: mensaje,
      reply_to: user.email,

    }
      console.log(user);

    emailjs.send('service_r4gna47', 'template_v3mqgrm', templateParams,"user_E6lUfQNLblPkdsA4OSKpD")
      .then((result: EmailJSResponseStatus) => {

        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    
  }
  
  
}
