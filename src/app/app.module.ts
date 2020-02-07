import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { VerReportesPage } from '../pages/ver-reportes/ver-reportes';
import { VerTodoReportesPage } from '../pages/ver-todo-reportes/ver-todo-reportes';
import { RegisterPage } from '../pages/register/register';
import { ContactoPage } from '../pages/contacto/contacto';
import { ModalNuevoSitioPage } from '../pages/modal-nuevo-sitio/modal-nuevo-sitio';
import { ModalDetalleTodoPage } from '../pages/modal-detalle-todo/modal-detalle-todo';
import { ModalDetalleSitioPage } from '../pages/modal-detalle-sitio/modal-detalle-sitio';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GoogleMaps } from '@ionic-native/google-maps';
import { Camera } from '@ionic-native/camera';
import { AuthProvider } from '../providers/auth/auth';
import { FirebaseDbProvider } from '../providers/firebase-db/firebase-db';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Facebook } from '@ionic-native/facebook';

var config = {
  apiKey: "AIzaSyBgRfFgkVY2FqW5ac46ot7rS1Jv0FfEI_8",
  authDomain: "reportesapp-3fb45.firebaseapp.com",
  databaseURL: "https://reportesapp-3fb45.firebaseio.com",
  projectId: "reportesapp-3fb45",
  storageBucket: "reportesapp-3fb45.appspot.com",
  messagingSenderId: "471528818789"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    VerReportesPage,
    VerTodoReportesPage,
    RegisterPage,
    ContactoPage,
    ModalDetalleSitioPage,
    ModalDetalleTodoPage,
    ModalNuevoSitioPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false,
      autoFocusAssist: false
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    VerReportesPage,
    VerTodoReportesPage,
    RegisterPage,
    ContactoPage,
    ModalDetalleSitioPage,
    ModalDetalleTodoPage,
    ModalNuevoSitioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Camera,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    FirebaseDbProvider
  ]
})
export class AppModule {}
