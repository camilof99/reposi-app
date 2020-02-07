import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the ModalDetalleSitioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-detalle-sitio',
  templateUrl: 'modal-detalle-sitio.html',
})
export class ModalDetalleSitioPage {

  sitio: any;
  edit: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl : ViewController,
    private dbFirebase :FirebaseDbProvider,  private camera: Camera) {

      this.sitio = this.navParams.data;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalDetalleSitioPage');
  }

  cerrarModal(){
    this.viewCtrl.dismiss();
  }

  editar(){
    this.edit = true;
  }

  sacarFoto(){

    let cameraOptions : CameraOptions = {
        quality: 50,
        encodingType: this.camera.EncodingType.JPEG,
        targetWidth: 800,
        targetHeight: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        correctOrientation: true
    }


    this.camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is a base64 encoded string
        this.sitio.foto = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }

  subirFoto(){

    let cameraOptions : CameraOptions = {
        quality: 50,
        encodingType: this.camera.EncodingType.JPEG,
        targetWidth: 800,
        targetHeight: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        correctOrientation: true
    }


    this.camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is a base64 encoded string
        this.sitio.foto = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }

  guardarCambios(){

    let sitio = {
     id : this.sitio.id,
     lat: this.sitio.lat,
     lng: this.sitio.lng ,
     address: this.sitio.address,
     description: this.sitio.description,
     foto: this.sitio.foto
   }

   this.dbFirebase.guardaSitio(sitio).then(res=>{
       console.log('Sitio modificado en firebase');
       this.cerrarModal();
   })
  }


}
