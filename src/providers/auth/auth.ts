import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Platform } from 'ionic-angular';
import { auth } from 'firebase';
import { Facebook } from '@ionic-native/facebook';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(private afAuth :  AngularFireAuth, private platform: Platform,
    private fb: Facebook) {
    console.log('Hello AuthProvider Provider');
  }

      // Registro de usuario
      registerUser(email:string, password:string){
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((res)=>{
         // El usuario se ha creado correctamente.
        })
        .catch(err=>Promise.reject(err))
     }

     // Login de usuario
 loginUser(email:string, password:string){
  return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then((user) =>Promise.resolve(user))
    .catch(err => Promise.reject(err))
}

// Devuelve la session
get Session(){
  return this.afAuth.authState;
 }

 // Logout de usuario
 logout(){
  this.afAuth.auth.signOut().then(()=>{
    // hemos salido
  })
 }

 getUser(){
  return this.afAuth.auth.currentUser.uid;
 }

 getEmail(){
  return this.afAuth.auth.currentUser.email;
 }

loginWithFacebook() {
  return Observable.create(observer => {
    if (this.platform.is('cordova')) {
      this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        this.afAuth.auth.signInWithCredential(facebookCredential).then(user => {
          observer.next(user);
        }).catch(error => {
          observer.error(error);
        });
      }).catch((error) => {
        observer.error(error);
      });
    } else {
      this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then((res) => {
          observer.next(res);
        }).catch(error => {
        observer.error(error);
      });
    }
  });
}
    
}