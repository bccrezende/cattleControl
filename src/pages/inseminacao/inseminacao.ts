import { AngularFireAuth } from "angularfire2/auth";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";
import * as firebase from "firebase";
import { InseminacaoAddPage } from "../inseminacao-add/inseminacao-add";
import { InseminacaoModalDetailsPage } from '../inseminacao-modal-details/inseminacao-modal-details';

/**
 * Generated class for the InseminacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-inseminacao",
  templateUrl: "inseminacao.html"
})
export class InseminacaoPage {
  inseminacoes: any;

  private db: any;
  model: any = {};
  inseminacaoPage: any;
  modal_page: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public modalCtrl: ModalController
  ) {
    this.db = firebase.firestore();

    this.inseminacaoPage = InseminacaoAddPage;

    this.loadData();
  }
  openModal(tipo, key) {
    switch (tipo) {
      case "inseminacao":
        this.modal_page = InseminacaoModalDetailsPage;
        break;
    }
    let modal = this.modalCtrl.create(this.modal_page, { key });
    modal.present();
  }

  loadData() {
    this.getAllDocuments("inseminacao").then(e => {
      this.inseminacoes = e;
    });
  }

  getAllDocuments(collection: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection(collection)
        .get()
        .then(querySnapshot => {
          let arr = [];
          querySnapshot.forEach(function(doc) {
            var obj = JSON.parse(JSON.stringify(doc.data()));
            obj.$key = doc.id;
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
}
