import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../providers/auth/auth-service';

/**
 * Generated class for the ResetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {

  userEmail: string = '';
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private authService: AuthService) {
  }

  resetPassword(){
    if(this.form.form.valid){
      let toast = this.toastCtrl.create({duration: 3000, position: 'bottom'})
      this.authService.resetPassword(this.userEmail)
      .then(() => {
          toast.setMessage("Solicitação de mudança de senha enviada para o e-mail")
          toast.present;

          this.navCtrl.pop();
      })
      .catch((error: any) => {
        if (error.code == "auth/invalid-email"){
          toast.setMessage('Usuário Inválido');
        } else if(error.code == "auth/user-not-found"){
          toast.setMessage('Usuário não encontrado');
        }
        toast.present();
      });
      
    }
  }

}
