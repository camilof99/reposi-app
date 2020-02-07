import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';

/**
 * Generated class for the VerReportesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ver-reportes',
  templateUrl: 'ver-reportes.html',
})
export class VerReportesPage {

  sitios: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public modalCtrl : ModalController,
    public alertCtrl : AlertController,
    public dbFirebase: FirebaseDbProvider) {
  }

  ionViewDidEnter(){
   
    this.dbFirebase.getSitios().subscribe(sitios=>{
      this.sitios = sitios;
      console.log(this.sitios);
    })

}

muestraSitio(sitio){
  let modalSitio = this.modalCtrl.create( 'ModalDetalleSitioPage', sitio );
  modalSitio.present();
}

borrarSitio(id){

  let alert = this.alertCtrl.create({
    title: 'Confirmar borrado',
    message: '¿Estás seguro de que deseas eliminar este sitio?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler: () => {
          // Ha respondido que no así que no hacemos nada
        }
      },
      {
        text: 'Si',
        handler: () => {
             // AquÍ borramos el sitio en firebase
            this.dbFirebase.borrarSitio(id);
         }
      }
    ]
  });

  alert.present();

}

}
