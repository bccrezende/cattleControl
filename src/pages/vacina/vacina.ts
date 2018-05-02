import { VacinaModalDetailsPage } from './../vacina-modal-details/vacina-modal-details';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import * as firebase from 'firebase';
import { VacinaAddPage } from '../vacina-add/vacina-add';

@IonicPage()
@Component({
  selector: 'page-vacina',
  templateUrl: 'vacina.html',
})

export class VacinaPage {
  db: any;
  modal_page: any;
  vacinas: any;
  vacinaPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afAuth: AngularFireAuth, public modalCtrl: ModalController) {

      this.db = firebase.firestore();
      this.loadData();
      this.vacinaPage = VacinaAddPage;
  }
  
  openModal(tipo, key) {
    switch (tipo) {
        case "vacina":
          this.modal_page = VacinaModalDetailsPage;
          break;
    }
    let modal = this.modalCtrl.create(this.modal_page, {key});
    modal.present();
  }

  loadData(){
    this.getAllDocuments("vacinas").then((list_vacinas)=>{
      this.vacinas = list_vacinas;
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
