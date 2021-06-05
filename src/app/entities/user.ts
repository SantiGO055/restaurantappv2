export class User {
  uid: string;
  email: string;
  displayName: string;
  emailVerified: boolean;
  photoURL:string;

  static fromAuth( authData:any, displayName:String, photoUrl:string ) :User{
    return  {
      uid: authData.user.uid,
      displayName: displayName,
      photoURL : photoUrl,
      emailVerified: authData.user.emailVerified, 
    } as User;    
  }

}



