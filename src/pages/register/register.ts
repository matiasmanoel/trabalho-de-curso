import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  username:string;
  password:string;
  confirmPassword:string;
  email:string;
  confirmEmail:string;
  /// <reference path="" />
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }
  
  register(){
    if(this.username == null || this.password == null || this.confirmPassword==null || this.email==null || this.confirmEmail==null){
      alert("Por Favor! Preencha todos os campos!");
    }else{
      this.navCtrl.push(TabsPage);
    }
  }
}
