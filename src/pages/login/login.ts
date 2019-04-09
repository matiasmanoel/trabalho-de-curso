import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string;
  password: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  goToRegister(){
    this.navCtrl.push(RegisterPage);
  }
  goToHome(){

    this.navCtrl.push(TabsPage);
  }

  loginUser(){
    if(this.username != null && this.password != null){
      this.navCtrl.push(TabsPage);
      console.log();
    }else{
      this.showAlert();
    }
    console.log("User: " + this.username);
    console.log("Passwd: " + this.password);
  }

  showAlert(){
    const alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: 'Complete os campos com os dados corretamente',
      buttons: ['OK']
    });
    alert.present();
  }

}
