import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userName'
})
export class UserNamePipe implements PipeTransform {

  readonly PRINCIPIO = 'avillucas';
  readonly FIN = '@gmail.com';
  
 
  transform(value: any): string {    
    if (!value) {
      return value;
    }
    return value
      .replace(new RegExp(this.PRINCIPIO, 'g'), '')
      .replace(new RegExp(this.FIN, 'g'), '');
  }

}