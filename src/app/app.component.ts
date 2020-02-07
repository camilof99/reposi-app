import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import{ LoginPage } from '../pages/login/login';
import{ VerReportesPage } from '../pages/ver-reportes/ver-reportes';
import { AuthProvider } from '../providers/auth/auth';
import { VerTodoReportesPage } from '../pages/ver-todo-reportes/ver-todo-reportes';
import { ContactoPage } from '../pages/contacto/contacto';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  email: string;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, 
    public splashScreen: SplashScreen, private auth: AuthProvider,
    public menuCtrl: MenuController, public alertCtrl : AlertController) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: HomePage, icon: 'home' },
      { title: 'Reportar Área', component: ListPage, icon: 'md-pin' },
      { title: 'Ver Mis Reportes', component: VerReportesPage, icon: 'md-eye' },
      { title: 'Ver Reportes', component: VerTodoReportesPage, icon: 'ios-nuclear' },
      { title: 'Contacto', component: ContactoPage, icon: 'md-contacts' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
     

      this.auth.Session.subscribe(session=>{
        if(session){
            this.rootPage = HomePage;
            this.emailF();
        }
          else{
            this.rootPage = LoginPage;
          }
      });

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
  cerrarSesion(){    

    let alert = this.alertCtrl.create({
      title: 'Cerrar Sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
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
               // AquÍ cerramos sesión
               
    this.closeMenu();
    this.auth.logout();
           }
        }
      ]
    });
  
    alert.present();
}

closeMenu() {
  this.menuCtrl.close();
}

emailF(){
  this.email = this.auth.getEmail();
  console.log(this.email);
}


}
