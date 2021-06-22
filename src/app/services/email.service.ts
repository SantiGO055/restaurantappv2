import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus, init } from 'emailjs-com';
import { User } from '../entities/user';
import { Registro } from '../entities/registro';


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  
  constructor() {
    init("user_E6lUfQNLblPkdsA4OSKpD");
   }


   public sendRegistro(registro: Registro,mensaje: string) {
    let templateParams =  {
      from_name: 'Lo de Tito',
      to_name: registro.displayName,
      message: mensaje,
      to_email: registro.email,

    }
    emailjs.send('service_r4gna47', 'template_v3mqgrm', templateParams)
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    
  }

  public sendEmail(user: User,mensaje: string) {
    let templateParams =  {
      from_name: 'Lo de Tito',
      to_name: user.displayName,
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
