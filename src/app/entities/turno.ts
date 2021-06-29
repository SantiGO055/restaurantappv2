import firebase from 'firebase/app';
import { Cliente } from './cliente';
import Timestamp = firebase.firestore.Timestamp;

export class Turno {
    id:string;
    uid:string;
    createdAt:Timestamp;  
    email: string;
    displayName: string;    
    photoURL?: string;  
    aceptado?: boolean;  
    mesa?: string;  
    
    static fromUser(cliente:Cliente) : Turno{        
        return {
            uid: cliente.uid, 
            email: cliente.email,
            displayName:cliente.displayName, 
            createdAt : Timestamp.now(), 
            photoURL: cliente.photoURL,
            mesa:null,
            aceptado:false,
        } as Turno;
    }
    
}

