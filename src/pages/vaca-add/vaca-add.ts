import { AnimalPage } from './../animal/animal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';

/**
 * Generated class for the AnimalAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vaca-add',
  templateUrl: 'vaca-add.html',
})
export class VacaAddPage {

  isEditing: boolean = false;
  model: any = {};
  private db: any;
  id: any;

  animal = {numero: '', data: '', origem: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.db = firebase.firestore();

    this.id = this.navParams.get('key');
    this.animal.numero = this.navParams.get('numero');
    this.animal.data = this.navParams.get('data');
    this.animal.origem = this.navParams.get('origem');
  }

  addAnimal(){
    if (this.id){
      this.animal["id"] = this.id;
      this.updateDocument("vaca", this.animal);
      this.navCtrl.push(AnimalPage);
    }
    else{
      this.addDocument("vaca", this.animal);
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
