import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Config, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConteudoProvider, Conteudo } from '../../providers/conteudo/conteudo';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the ConteudoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conteudo',
  templateUrl: 'conteudo.html',
  providers: [
    Camera
  ]
})
export class ConteudoPage {

  img = "";
  model: Conteudo;
  conteudos: any[];

  //public configPage: ConfigPage;

  public conteudo = {
    assunto: "",
    email: "",
    descricao: ""
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
   public http: Http,
   public toast: ToastController,
   private conteudoProvider: ConteudoProvider
    ) {
      this.model = new Conteudo();
      if(this.navParams.data.id){
        this.conteudoProvider.get(this.navParams.data.id)
        .then((result: any)=> {
          this.model = result;
        })
      }
  }

  ionViewDidLoad() {
    this.conteudoProvider.getAll()
      .then((result: any[]) => {
        this.conteudos = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar as categorias.', duration: 3000, position: 'botton' }).present();
      });

  }

  abrirGaleria(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData) =>{
      this.img = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {

    });
  }

  tirarFoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.img = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    });
  }

  uparFoto(){
    //colocar a url
    let url = '';
    let postData = new FormData();
    postData.append('file', this.img);
    let data:Observable<any> = this.http.post(url, postData);
    data.subscribe((result) =>{
      console.log(result);
    })
  }

  goBackHome(){
    this.navCtrl.pop();
  }

  saveConteudo(conteudo){
    let headers = new Headers;
        headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({headers: headers});
    // Aqui, fazer com que as informações sejam enviadas para outra página, no caso, para a Tabs Home.
    this.http.post("http://localhost:8100/", conteudo, options)
        .map(res => {res.json()})
        .subscribe(data => console.log());
  }

  public save(){
    this.saveCont()
      .then(() => {
        this.toast.create({ message: 'Conteúdo Criado', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o Conteúdo.', duration: 3000, position: 'botton' }).present();
      });
  }
  private saveCont(){
    if (this.model.id) {    
      return this.conteudoProvider.update(this.model);
    }else{
      return this.conteudoProvider.insert(this.model);
    }
  }
}


// ASSISTIR ESSE VÍDEO PARA CONTINUAR
// https://www.youtube.com/watch?v=1B4ZaOjVlZo&list=PLswa9HeoJUq_Dphg3w1TwqBMgruzRCwIO&index=14

// IMPORTANTE
// https://pt.stackoverflow.com/questions/343870/upload-de-imagem-para-server-apache2-ionic-3-php

// TOPICO IMPORTANTE
// https://stackoverflow.com/questions/43598311/component-is-part-of-the-declaration-of-2-modules

// https://pt.stackoverflow.com/questions/tagged/ionic