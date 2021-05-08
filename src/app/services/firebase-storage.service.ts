import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Photo } from '../entities/photo';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  private basePath:string;
  readonly DIR_UPLOAD = 'uploads';

  constructor(
    private storage: AngularFireStorage,    
  ) { 
    this.basePath = '/'+this.DIR_UPLOAD;
  }   

  pushFileToStorage(photo: Photo): Observable<number> {
    const filePath = `${this.basePath}/${photo.filepath}`;
    const storageRef = this.storage.ref(filePath);
    //@todo completar  este proceso
    const uploadTask = this.storage.upload(filePath,photo.url );
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          photo.url = downloadURL;          
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
  
}
