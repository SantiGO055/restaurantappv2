import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

export class Turno {
    uid:string;
    createdAt:Timestamp;    
    
    constructor(uid:string){
        //@todo revisar esto 
        this.createdAt = this.createdAt || Timestamp.now();
        this.uid = uid;
    }
    
}

