import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterPage } from '../register/register';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { Facebook } from '@ionic-native/facebook';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private email: string;
  private password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fire: AngularFireAuth,
    public auth : AuthProvider,
    public alertCtrl : AlertController,
    public platform: Platform,
    public facebook: Facebook) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    this.auth.loginUser(this.email, this.password ).then((user) => {

    })
   .catch(err=>{
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: err.message,
      buttons: ['Aceptar']
    });
    alert.present();
  })
  }

  register(){
    this.navCtrl.push(RegisterPage)
  }

  loginWithFacebook(): void {
    this.auth.loginWithFacebook().subscribe(data => {
      this.navCtrl.setRoot(HomePage);
    }, error=>{
      console.log(error);
    });
  }

}
