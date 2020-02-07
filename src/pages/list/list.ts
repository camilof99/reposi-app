import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng
} from '@ionic-native/google-maps';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';

declare var google: any;


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  map: GoogleMap;
  marker: any;
  coords : any = { lat: 0, lng: 0 }

  constructor(
    private navCtrl: NavController,
    private googleMaps: GoogleMaps,
   public modalCtrl : ModalController,
   public dbFirebase: FirebaseDbProvider
  ) {
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 10.4137, // default location
          lng: -75.5336 // default location
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      // Now you can use all methods safely.

      this.dbFirebase.getAllCatList()
    .then(res => {

      for(var i = 0; i < res.length; i++){

        this.map.addCircleSync({
          strokeColor: '#005D80',
          strokeOpacity: 0.4,
          strokeWeight: 3,
          strokeWidth: 5,
          fillColor: '#803200',
          fillOpacity: 0.3,
          center: new LatLng(res[i].lat, res[i].lng),
          radius: 5
        });
      }
    })

    this.map.getMyLocation()
    .then(response => {
      this.map.moveCamera({
        target: response.latLng
      });
       this.marker = this.map.addMarker({
        title: 'My Position - Área',
        icon: 'blue',
        animation: 'DROP',
        draggable: true,
        position: response.latLng
      });
      
    this.coords.lat = response.latLng.lat,
    this.coords.lng = response.latLng.lng

    })
    .catch(error =>{
      console.log(error);
    });
    
    })
    .catch(error =>{
      console.log(error);
    });

  }

  nuevoSitio(){
    // aquí vamos a abrir el modal para añadir nuestro sitio.
    let mimodal = this.modalCtrl.create( 'ModalNuevoSitioPage', this.coords );
   mimodal.present();
   }
  
}
