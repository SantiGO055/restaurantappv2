import { User } from 'src/app/entities/user';
import { Rol } from 'src/app/enums/rol';
import { SysError } from './sysError';

export class Cliente extends User {
  
    constructor(){
        super();
        this.rol = Rol.CLIENTE;
    }

    static fromUser(user:User){
        if(user.rol != Rol.CLIENTE){
            throw new SysError('El usuario debe ser un cliente');
        }
        return user as Cliente;
    }
    
}