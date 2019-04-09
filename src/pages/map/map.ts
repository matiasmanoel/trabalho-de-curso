import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition()
    .then((resp) => {
      const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

      const mapOptions = {
        zoom: 18,
        center: position        
      }

      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

      const marker = new google.maps.Marker({
        position: position,
        map: this.map
      });
    })
    .catch((error) => {
      console.log('Erro ao Recuperar sua Localização!', error);
    });
  }

}
