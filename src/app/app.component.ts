import { AnimalPage } from './../pages/animal/animal';
import { VacinaPage } from './../pages/vacina/vacina';
import { AngularFireAuth } from 'angularfire2/auth';
import { Push, PushOptions, PushObject } from '@ionic-native/push';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AuthService } from '../providers/auth/auth-service';
import { SigninPage } from '../pages/signin/signin';
import { InseminacaoPage } from '../pages/inseminacao/inseminacao';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public push: Push,
    public alertCtrl: AlertController,
    afAuth: AngularFireAuth, 
    private authService: AuthService, 
    modalCtrl: ModalController) {

    const authObserver = afAuth.authState.subscribe(user => {
      if (user) {
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = SigninPage;
        authObserver.unsubscribe();
      }
    });
   

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.pushsetup();
    });

    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Animais', component: AnimalPage }, 
      { title: 'Vacinas', component: VacinaPage }, 
      { title: 'Inseminacoes', component: InseminacaoPage }, 
    ];

  }
  
  pushsetup() {
    const options: PushOptions = {};

    const pushObject: PushObject = this.push.init(options);

    pushObject.on("registration").subscribe((registration: any) => {});

    pushObject.on("notification").subscribe((notification: any) => {
      if (notification.additionalData.foreground) {
        let youralert = this.alertCtrl.create({
          title: notification.label,
          message: notification.message
        });
        youralert.present();
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  signOut(){
    this.authService.signOut()
      .then(() => {
        this.nav.setRoot(SigninPage);
      })
      .catch((error)=>{
        console.error(error);
      });
  }
}
