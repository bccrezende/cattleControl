import { BoiModalDetailsPage } from "./../boi-modal-details/boi-modal-details";
import { VacaModalDetailsPage } from "./../vaca-modal-details/vaca-modal-details";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";
import * as firebase from "firebase";
import { BezerroModalDetailsPage } from "../bezerro-modal-details/bezerro-modal-details";

@IonicPage()
@Component({
  selector: "page-vaca-modal-vacina",
  templateUrl: "vaca-modal-vacina.html"
})
export class VacaModalVacinaPage {
  isEditing: boolean = false;
  model: any = {};
  private db: any;
  categoria: any;
  modal_page: any;
  vacinas: any;

  vacina_aplicada = { vacina: "", data: "", animal: ""};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {
    this.db = firebase.firestore();
    this.loadVacina();
  }

  loadVacina() {
    this.get_vacinas("vacinas").then(e => {
      this.vacinas = e;
    });
  }

  get_vacinas(collection: string): Promise<any> {
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

  addVacinaAplicada() {
    let animal = this.navParams.get("animal");
    this.categoria = animal.categoria;
    this.vacina_aplicada.animal = "Oiii";
    console.log(animal[0].id);
    console.log(this.categoria);
    console.log(this.vacina_aplicada)
    this.addDocument("vacinas_aplicadas", this.vacina_aplicada);
    switch (this.categoria) {
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
    let modal = this.modalCtrl.create(
      this.modal_page,
      this.vacina_aplicada.animal
    );
    modal.present();
  }

  addDocument(collectionName: string, dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection(collectionName)
        .add(dataObj)
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
      this.db
        .collection(collectionName)
        .doc(dataObj.id)
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
