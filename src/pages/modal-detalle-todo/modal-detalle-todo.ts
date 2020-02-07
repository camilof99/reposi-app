import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalDetalleTodoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-detalle-todo',
  templateUrl: 'modal-detalle-todo.html',
})
export class ModalDetalleTodoPage {

  sitio: any;
  edit: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl : ViewController) {

      this.sitio = this.navParams.data;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalDetalleSitioPage');
  }

  cerrarModal(){
    this.viewCtrl.dismiss();
  }
}
