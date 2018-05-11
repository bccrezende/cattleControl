import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { AnimalPage } from '../animal/animal';

@IonicPage()
@Component({
  selector: 'page-inseminacao-add',
  templateUrl: 'inseminacao-add.html',
})
export class InseminacaoAddPage {

  private db: any;
  vacas: any;
  bois: any;

  inseminacao = { id: '', data: '', vaca: '', boi: '',};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.db = firebase.firestore();
    this.loadData();

    this.inseminacao.id = this.navParams.get('id');
    this.inseminacao.data = this.navParams.get('data');
    this.inseminacao.vaca = this.navParams.get('vaca');
    this.inseminacao.boi = this.navParams.get('boi');
  }

  loadData(){
    this.getAllDocuments("boi").then((e)=>{
      this.bois = e;
    });
    this.getAllDocuments("vaca").then((e)=>{
        this.vacas = e;
    });
  }

  addInseminacao(){
    if (this.inseminacao.id){
      this.updateDocument("inseminacao", this.inseminacao);
      this.navCtrl.push(AnimalPage);
    }
    else{
      this.addDocument("inseminacao", this.inseminacao);
      this.navCtrl.push(AnimalPage);
    }
    
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