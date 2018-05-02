import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { VacinaPage } from '../vacina/vacina';

/**
 * Generated class for the VacinaAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vacina-add',
  templateUrl: 'vacina-add.html',
})
export class VacinaAddPage {

  model: any = {};
  private db: any;
  id: any;

  vacina = { categoria: '', custo: '', data: '', nome:''};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.db = firebase.firestore();

    this.id = this.navParams.get('key');
    this.vacina.categoria = this.navParams.get('categoria');
    this.vacina.custo = this.navParams.get('custo');
    this.vacina.data = this.navParams.get('data');
    this.vacina.nome = this.navParams.get('nome');

    
  }

  addVacina(){
    
    if (this.id){
      this.vacina["id"] = this.id;
      this.updateDocument("vacinas", this.vacina);
      this.navCtrl.push(VacinaPage);
    }
    else{
      this.addDocument("vacinas", this.vacina);
      this.navCtrl.push(VacinaPage);
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
