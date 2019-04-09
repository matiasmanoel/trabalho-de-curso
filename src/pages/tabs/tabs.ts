import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ConteudoPage } from '../conteudo/conteudo';
import { MapPage } from '../map/map';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ConteudoPage;
  tab3Root = MapPage;

  constructor() {

  }
}
