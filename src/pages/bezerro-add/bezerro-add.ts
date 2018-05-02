import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { AnimalPage } from '../animal/animal';

/**
 * Generated class for the BezerroAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bezerro-add',
  templateUrl: 'bezerro-add.html',
})
export class BezerroAddPage {

  private db: any;
  vacas: any;
  bois: any;

  animal = { id: '', numero: '', sexo: '', data: '', vaca: '', boi: '', raca: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.db = firebase.firestore();
    this.loadData();

    this.animal.id = this.navParams.get('id');
    this.animal.numero = this.navParams.get('numero');
    this.animal.sexo = this.navParams.get('sexo');
    this.animal.data = this.navParams.get('data');
    this.animal.vaca = this.navParams.get('vaca');
    this.animal.boi = this.navParams.get('boi');
    this.animal.raca = this.navParams.get('raca');

  }

  loadData(){
    this.getAllDocuments("boi").then((e)=>{
      this.bois = e;
    });
    this.getAllDocuments("vaca").then((e)=>{
        this.vacas = e;
    });
  }

  addAnimal(){
    if (this.animal.id){
      this.updateDocument("bezerro", this.animal);
      this.navCtrl.push(AnimalPage);
    }
    else{
      this.addDocument("bezerro", this.animal);
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
