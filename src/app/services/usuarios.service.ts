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

  crear(postData : { nombre:string , apellido:string , dni:string , username:string , password:string } ): Observable<any> {  
    //@todo sacar los datos completos , cargar el sexo
    const user = {username:postData.username, password:postData.password,name:postData.nombre,surname:postData.apellido,sexo:'F',role:'admin',dni:postData.dni } as ApiUser;
    return  this.httpService.post(this.ENDPOINT_URL, postData);
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
