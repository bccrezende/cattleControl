import { BezerroAddPage } from './../bezerro-add/bezerro-add';
import { AnimalPage } from './../animal/animal';
import { ViewController, ModalController, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavParams, Platform } from 'ionic-angular';
import * as firebase from 'firebase';

/**
 * Generated class for the BezerroModalDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bezerro-modal-details',
  templateUrl: 'bezerro-modal-details.html',
})
export class BezerroModalDetailsPage {

  character;
  private db: any;
  animal: any;
  key;
  boi_key: any;
  boi_info: any;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public navCtrl: NavController
  ) {
    this.db = firebase.firestore();
    this.loadData2();
    
  }
  openModalBoi(number){
    this.get_key("boi", number).then(e => {
      this.boi_info = e;
      this.boi_info.forEach(function(doc) {
        this.boi_key = JSON.parse(JSON.stringify(doc.$key));
      });
    });
  }
  get_key(collection: string, number: string){
    return new Promise((resolve, reject) => {
      this.db
        .collection(collection)
        .where("numero", "==", number)
        .get()
        .then(function(querySnapshot) {
          let arr = [];
          querySnapshot.forEach(function(doc) {
              let arr = [];
              var obj = JSON.parse(JSON.stringify(doc.data()));
              obj.$key = querySnapshot.id;
              arr.push(obj);
          });
          if (arr.length > 0) {
            resolve(arr);
          } else {
            resolve(null);
          }
      })
     
       
    });
  }
  loadData2() {
    this.key = this.params.get("key");
    this.getDocuments("bezerro", this.key).then(e => {
      this.animal = e;
    });
  }
  updateAnimal(animal){
    this.navCtrl.push(BezerroAddPage, {
      id: animal.$key,
      numero: animal.numero,
      sexo: animal.sexo,
      data: animal.data,
      vaca: animal.vaca,
      boi: animal.boi,
      raca: animal.raca,
    });
  }
  deleteAnimal(key){
    this.deleteDocument("bezerro", key).then(()=>{
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
}



