import { AnimalPage } from './../animal/animal';
import { ViewController, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavParams, Platform } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { BoiAddPage } from '../boi-add/boi-add';

/**
 * Generated class for the BoiModalDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-boi-modal-details',
  templateUrl: 'boi-modal-details.html',
})
export class BoiModalDetailsPage {

  character;
  private db: any;
  animal: any;
  key;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController
  ) {
    this.db = firebase.firestore();
    this.loadData2();
    
  }
  loadData2() {
    this.key = this.params.get("key");
    this.getDocuments("boi", this.key).then(e => {
      this.animal = e;
    });
  }
  updateAnimal(animal){
    this.navCtrl.push(BoiAddPage, {
      key: animal.$key,
      numero: animal.numero,
      registro: animal.registro,
      origem: animal.origem,
      raca: animal.raca,
      data: animal.data,
    });
  }
  getDocuments(collection: string, docID: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection(collection)
        .doc(docID)
        .get()
        .then(teste => {
          let arr = [];
          var obj = JSON.parse(JSON.stringify(teste.data()));
          obj.$key = teste.id;
          arr.push(obj);
          if (arr.length > 0) {
            resolve(arr);
          } else {
            resolve(null);
          }
        });
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  deleteAnimal(key){
    this.deleteDocument("boi", key).then(()=>{
      this.navCtrl.push(AnimalPage);
    });
  }

  deleteDocument(collectionName: string, docID: string): Promise<any> {
    return new Promise((resolve, reject) => {
        this.db
            .collection(collectionName)
            .doc(docID)
            .delete()
            .then((obj: any) => {
                resolve(obj);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
  }


}
