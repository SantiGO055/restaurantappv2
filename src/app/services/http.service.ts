import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiUser } from '../entities/apiUser';

@Injectable({
providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  post(serviceName: string, data: any) {    
    const url = environment.apiUrl + serviceName;
    return  this.http.post(url, JSON.stringify(data));
  }

  get(serviceName: string) :Observable<any>{    
    const url = environment.apiUrl + serviceName;
    return  this.http.get(url);
  }

  delete(serviceName: string) :Observable<any>{    
    const url = environment.apiUrl + serviceName;
    return  this.http.delete(url);
  }

  update(serviceName: string, data: ApiUser) {    
    const url = environment.apiUrl + serviceName;
    return  this.http.put(url, JSON.stringify(data));
  }

}