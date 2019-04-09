import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, NavController } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { LoginPageModule } from '../pages/login/login.module';
import { RegisterPage } from '../pages/register/register';
import { ConteudoPage } from '../pages/conteudo/conteudo';
import { Http } from '@angular/http';
import { HttpModule} from '@angular/http';
import { SQLite } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../providers/database/database';
import { ConteudoProvider } from '../providers/conteudo/conteudo';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { ConteudoPageModule } from '../pages/conteudo/conteudo.module';
import { CategoriaProvider } from '../providers/categoria/categoria';

import { Geolocation } from '@ionic-native/geolocation';
import { MapPage } from '../pages/map/map';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    MapPage
    // ConteudoPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    ConteudoPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ConteudoPage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    DatabaseProvider,
    ConteudoProvider,
    UsuarioProvider,
    DatabaseProvider,
    ConteudoProvider,
    CategoriaProvider,
    Geolocation,
  ]
})
export class AppModule {}
