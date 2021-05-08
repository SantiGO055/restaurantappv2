import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { ApiUser } from '../entities/apiUser';
import { map } from 'rxjs/operators';
import { UserResult } from '../entities/userResult';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  readonly ENDPOINT_URL = 'users';
  constructor(
    private httpService: HttpService
  ) { }

  crear(postData  ): Observable<any> {  
    const user = {
      "username":postData.username,
       "password":postData.password,
       "name":postData.nombre,
       "surname":postData.apellidos,
       "sexo":'F',
       "role":'usuario',
       "dni":postData.dni,
       "avatar":postData.avatar
       } ;
    return  this.httpService.post(this.ENDPOINT_URL, user);
  }

  get(page:number): Observable<any> {          
    return  this.httpService.get(this.ENDPOINT_URL).pipe(
      map( (response:UserResult) => {
        return response.list;
      })
    );
  }  
  
  delete(userId:number): Observable<any> {          
    return  this.httpService.delete(this.ENDPOINT_URL+'/'+userId);
  }  
  
}
