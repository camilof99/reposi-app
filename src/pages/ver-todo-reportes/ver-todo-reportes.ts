import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { FirebaseDbProvider, Categoria, Cat } from '../../providers/firebase-db/firebase-db';

/**
 * Generated class for the VerTodoReportesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ver-todo-reportes',
  templateUrl: 'ver-todo-reportes.html',
})
export class VerTodoReportesPage {

  sitios: Categoria[]

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public modalCtrl : ModalController,
    public alertCtrl : AlertController,
    public dbFirebase: FirebaseDbProvider) {
  }

  ionViewDidEnter(){
    this.dbFirebase.getAllCatList()
    .then(res => {
      this.sitios = res;
      console.log(this.sitios);
    })

}

muestraSitio(sitio){
  let modalSitio = this.modalCtrl.create( 'ModalDetalleTodoPage', sitio );
  modalSitio.present();
}

}
