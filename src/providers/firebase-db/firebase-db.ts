import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthProvider } from '../auth/auth';
/*
  Generated class for the FirebaseDbProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

export interface Categoria {
  description: string,
  foto: string,
  id: number,
  address: string
  lat: number;
  lng: number;
}
export interface Cat { [key: number]: Categoria }
export interface DATABASE { [key: string]: Cat}

@Injectable()
export class FirebaseDbProvider {

  constructor(public afDB: AngularFireDatabase, public auth: AuthProvider) {
    console.log('Hello FirebaseDbProvider Provider');
  }

  guardaSitio(sitio){
    if(!sitio.id){
      sitio.id  = Date.now();
    }
    return this.afDB.database.ref('sitios/'+this.auth.getUser()+'/'+sitio.id).set(sitio);
 }

 getSitios(){
  return this.afDB.list('sitios/'+this.auth.getUser()).valueChanges();
}

getTodos(){
  return this.afDB.list('sitios/').valueChanges();
}

getAllCatList(): Promise<Categoria[]> {
  return new Promise((resolve, reject) => {
    this.afDB.database.ref('sitios').orderByChild('uid').once('value', snapshot => {
      let catData = snapshot.val();
      let temparr: Categoria[] = [];
      for (var key in catData) {
        for (var key2 in catData[key]) {
          temparr.push(catData[key][key2])
        }
      }
      resolve(temparr);
    });
  })
}

public borrarSitio(id){
  this.afDB.database.ref('sitios/'+this.auth.getUser()+'/'+id).remove();

}
 
}