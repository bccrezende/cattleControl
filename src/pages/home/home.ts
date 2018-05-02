import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
date: any;
  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth) {
    this.date = new Date();

  }

}
