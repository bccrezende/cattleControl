import { BezerroModalDetailsPage } from './../bezerro-modal-details/bezerro-modal-details';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import 'firebase/firestore';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { BezerroAddPage } from '../bezerro-add/bezerro-add';
import { BoiAddPage } from '../boi-add/boi-add';
import { VacaAddPage } from './../vaca-add/vaca-add';
import { VacaModalDetailsPage } from '../vaca-modal-details/vaca-modal-details';
import { BoiModalDetailsPage } from '../boi-modal-details/boi-modal-details';


@IonicPage()
@Component({
  selector: 'page-animal',
  templateUrl: 'animal.html',
})
export class AnimalPage {

  bois: any;
  vacas: any;
  bezerros: any;
  
  private db: any;
  model: any = {};
  isEditing: boolean = false;
  boiPage: any;
  vacaPage: any;
  bezerroPage: any;
  modal_page: any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public afAuth: AngularFireAuth, public modalCtrl: ModalController) 
  {
    this.db = firebase.firestore();

    this.boiPage = BoiAddPage;
    this.vacaPage = VacaAddPage;
    this.bezerroPage = BezerroAddPage;

    this.loadData();
  }
  openModal(tipo, key) {
    switch (tipo) {
        case "boi":
          this.modal_page = BoiModalDetailsPage;
          break;
        case "vaca":
          this.modal_page = VacaModalDetailsPage;
          break;
        case "bezerro":
          this.modal_page = BezerroModalDetailsPage;
          break;
    }
    let modal = this.modalCtrl.create(this.modal_page, {key});
    modal.present();
  }

  loadData(){
    this.getAllDocuments("boi").then((list_bois)=>{
      this.bois = list_bois;
    });
    this.getAllDocuments("vaca").then((list_vacas)=>{
        this.vacas = list_vacas;
    });
    this.getAllDocuments("bezerro").then((list_bezerros)=>{
        this.bezerros = list_bezerros;
    });
  }

/* updateMessage(obj){
  this.model = obj;
  this.isEditing = true;
} */

deleteMessage(key){
  this.deleteDocument("messages", key).then(()=>{
    this.loadData();//refresh view
    this.isEditing = false;
  });
}


getAllDocuments(collection: string): Promise<any> {
    return new Promise((resolve, reject) => {
        this.db.collection(collection)
            .get()
            .then((querySnapshot) => {
                let arr = [];
                querySnapshot.forEach(function (doc) {
                    var obj = JSON.parse(JSON.stringify(doc.data()));
                    obj.$key = doc.id
                    arr.push(obj);
                });

                if (arr.length > 0) {
                    resolve(arr);
                } else {
                    resolve(null);
                }


            })
            .catch((error: any) => {
                reject(error);
            });
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



updateDocument(collectionName: string, docID: string, dataObj: any): Promise<any> {
  return new Promise((resolve, reject) => {
      this.db
          .collection(collectionName)
          .doc(docID)
          .update(dataObj)
          .then((obj: any) => {
              resolve(obj);
          })
          .catch((error: any) => {
              reject(error);
          });
  });
}

}

