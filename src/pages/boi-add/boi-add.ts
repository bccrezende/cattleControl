import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { AnimalPage } from '../animal/animal';

/**
 * Generated class for the BoiAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-boi-add',
  templateUrl: 'boi-add.html',
})
export class BoiAddPage {

  private db: any;
  model: any = {};

  animal = { id: '', numero: '', registro: '', origem: '', raca: '', data: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.db = firebase.firestore();

    this.animal.id = this.navParams.get('key');
    this.animal.numero = this.navParams.get('numero');
    this.animal.registro = this.navParams.get('registro');
    this.animal.origem = this.navParams.get('origem');
    this.animal.raca = this.navParams.get('raca');
    this.animal.data = this.navParams.get('data');

  }

  addAnimal(){
    if (this.animal.numero){
      this.updateDocument("boi", this.animal);
      this.navCtrl.push(AnimalPage);
    }
    else{
      this.addDocument("boi", this.animal);
      this.navCtrl.push(AnimalPage);
    }
    
  }

  addDocument(collectionName: string, dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
        this.db.collection(collectionName).add(dataObj)
            .then((obj: any) => {
                resolve(obj);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
  }
  updateDocument(collectionName: string, dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
        this.db.collection(collectionName).doc(dataObj.id).update(dataObj)
            .then((obj: any) => {
                resolve(obj);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
  }

}
