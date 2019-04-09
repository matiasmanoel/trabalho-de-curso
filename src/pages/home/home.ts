import { ConteudoProvider, Conteudo } from './../../providers/conteudo/conteudo';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ConteudoPage } from '../conteudo/conteudo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  conteudo: any[] = [];
  searchText: string = null;

  constructor(
    public navCtrl: NavController,
    private toast: ToastController,
    private conteudoProvider: ConteudoProvider
    ) {

  }

  ionViewDidEnter(){
   this.getAllConteudo();
  }

  getAllConteudo(){
    this.conteudoProvider.getAll(this.searchText)
      .then((result: any[]) =>{
        this.conteudo = result;
      });
  }

  addConteudo(){
    this.navCtrl.push('ConteudoPage');
  }

  editConteudo(id: number){
    this.navCtrl.push('EditConteudoPage', {id: id});
  }

  removeConteudo(conteudo: Conteudo){
    this.conteudoProvider.remove(conteudo.id)
      .then(() => {
        //removendo do array de conteudo
        var index = this.conteudo.indexOf(conteudo);
        this.conteudo.splice(index, 1);
        this.toast.create({message: 'Conteudo Removido.', duration: 3000, position: 'botton'}).present();
      })
  }

  filtrarConteudo(ev: any){
    this.getAllConteudo();
  }
  goToHome(){
    this.navCtrl.push(ConteudoPage);
  }
}
