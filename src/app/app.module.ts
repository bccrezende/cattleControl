import { VacinaAddPage } from './../pages/vacina-add/vacina-add';
import { AnimalPageModule } from './../pages/animal/animal.module';
import { BoiModalDetailsPage } from './../pages/boi-modal-details/boi-modal-details';
import { BoiAddPage } from './../pages/boi-add/boi-add';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Push} from "@ionic-native/push";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthService } from '../providers/auth/auth-service';
import { ResetpasswordPage } from './../pages/resetpassword/resetpassword';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';
import { VacaAddPage } from '../pages/vaca-add/vaca-add';
import { BezerroAddPage } from '../pages/bezerro-add/bezerro-add';
import { VacaModalDetailsPage } from '../pages/vaca-modal-details/vaca-modal-details';
import { BezerroModalDetailsPage } from '../pages/bezerro-modal-details/bezerro-modal-details';
import { VacinaPage } from '../pages/vacina/vacina';
import { VacinaModalDetailsPage } from '../pages/vacina-modal-details/vacina-modal-details';
import { VacaModalVacinaPage } from '../pages/vaca-modal-vacina/vaca-modal-vacina';

export const firebaseConfig = {
  apiKey: "AIzaSyCihfocPsNkBbDgLJWZIiW8MOmscKpeSJk",
  authDomain: "cattlecontrol-e7c44.firebaseapp.com",
  databaseURL: "https://cattlecontrol-e7c44.firebaseio.com",
  projectId: "cattlecontrol-e7c44",
  storageBucket: "cattlecontrol-e7c44.appspot.com",
  messagingSenderId: "297714479311"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    ResetpasswordPage,
    VacaAddPage,
    BoiAddPage,
    BezerroAddPage,
    BoiModalDetailsPage, 
    VacaModalDetailsPage,
    BezerroModalDetailsPage,
    VacinaPage,
    VacinaAddPage,
    VacinaModalDetailsPage,
    VacaModalVacinaPage,
  ],
  imports: [
    AnimalPageModule,
    BrowserModule,
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    ResetpasswordPage,
    VacaAddPage,
    BoiAddPage,
    BezerroAddPage,
    BoiModalDetailsPage, 
    VacaModalDetailsPage,
    BezerroModalDetailsPage,
    VacinaPage,
    VacinaAddPage,
    VacinaModalDetailsPage,
    VacaModalVacinaPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
