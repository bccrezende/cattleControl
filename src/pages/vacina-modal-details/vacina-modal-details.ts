import { VacinaAddPage } from './../vacina-add/vacina-add';
import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import * as firebase from 'firebase';
import { VacinaPage } from '../vacina/vacina';

@IonicPage()
@Component({
  selector: 'page-vacina-modal-details',
  templateUrl: 'vacina-modal-details.html',
})
export class VacinaModalDetailsPage {

  character;
  private db: any;
  vacina: any;
  key;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
  ) {
    this.db = firebase.firestore();
    this.loadData2();
    
  }
  loadData2() {
    this.key = this.params.get("key");
    this.getDocuments("vacinas", this.key).then(e => {
      this.vacina = e;
    });
  }
  updateVacina(vacina){
    this.navCtrl.push(VacinaAddPage, {
      key: vacina.$key,
      categoria: vacina.categoria,
      custo: vacina.custo,
      data: vacina.data,
      nome: vacina.nome,
    });
  }
  deleteVacina(key){
    this.deleteDocument("vacinas", key).then(()=>{
      this.navCtrl.push(VacinaPage);
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