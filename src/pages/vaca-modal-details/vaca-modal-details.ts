import { VacaModalVacinaPage } from './../vaca-modal-vacina/vaca-modal-vacina';
import { ViewController, NavController, ModalController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavParams, Platform } from 'ionic-angular';
import * as firebase from 'firebase';
import { AnimalPage } from '../animal/animal';
import { VacaAddPage } from '../vaca-add/vaca-add';

/**
 * Generated class for the VacaModalDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vaca-modal-details',
  templateUrl: 'vaca-modal-details.html',
})
export class VacaModalDetailsPage {

  character;
  private db: any;
  animal: any;
  key: any;
  vacinas: any;
  inseminacoes: any;
  vacinaPage: any;
  inseminacaoPage: any; 

  info = {animal: '', categoria: ''}

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) {
    this.db = firebase.firestore();
    this.loadData2();
  }
  openModal(categoria, animal){
    animal["categoria"] = categoria;
    let modal = this.modalCtrl.create(VacaModalVacinaPage, {animal});
    modal.present();
  }

  loadData2() {
    this.key = this.params.get("key");
    this.getDocuments("vaca", this.key).then(e => {
      this.animal = e;
    });
    this.getDocumentsFiltered("vacinas_aplicadas", this.key).then(e => {
      this.vacinas = e;
    });
    /* this.getDocuments("inseminacao", this.key).then(e => {
      this.inseminacoes = e;
    }); */

  }
  updateAnimal(animal){
    this.navCtrl.push(VacaAddPage, {
      key: animal.$key,
      numero: animal.numero,
      data: animal.data,
      origem: animal.origem,
    });
  }
  deleteAnimal(key){
    this.deleteDocument("vaca", key).then(()=>{
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
  getDocumentsFiltered(collection: string, number: string){
    return new Promise((resolve, reject) => {
      this.db
        .collection(collection)
        .where("vaca", "==", number)
        .get()
        .then(function(querySnapshot) {
          let arr = [];
          querySnapshot.forEach(function(doc) {
              var obj = JSON.parse(JSON.stringify(doc.data()));
              obj.$key = querySnapshot.id;
              arr.push(obj);
          });
          if (arr.length != 0) {
            resolve(arr);
          } else {
            resolve(null);
          }
      })
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
