import { Component } from "@angular/core";
import { IonicPage, NavParams, Platform, ViewController } from "ionic-angular";
import * as firebase from "firebase";

/**
 * Generated class for the AnimalModalDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-animal-modal-details",
  templateUrl: "animal-modal-details.html"
})
export class AnimalModalDetailsPage {
  character;
  private db: any;
  animal: any;
  key;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    this.db = firebase.firestore();
    this.loadData2();
    
  }
  loadData2() {
    this.key = this.params.get("key");
    this.getDocuments("messages", this.key).then(e => {
      this.animal = e;
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
