import { User } from './../../providers/auth/user';
import { HomePage } from './../home/home';
import { ResetpasswordPage } from './../resetpassword/resetpassword';
import { SignupPage } from './../signup/signup';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  
  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, 
    private toastCtrl: ToastController,) {
  }

  createAccount(){
    this.navCtrl.push(SignupPage);
  }

  resetPassword(){
    this.navCtrl.push(ResetpasswordPage);
  }

  signIn(){
    if(this.form.form.valid){
      this.authService.signIn(this.user)
      .then(()=>{
        this.navCtrl.setRoot(HomePage);
      })
      .catch((error: any) =>{
        let toast = this.toastCtrl.create({duration: 1000, position:'bottom'})
        if(error.code == 'auth/invalid-email'){
          toast.setMessage('E-mail inválido');
        }else if(error.code == 'auth/user-disable'){
          toast.setMessage('Usuário desabilitado');
        }else if(error.code == 'auth/user-not-found'){
          toast.setMessage('Usuário não encontrado');
        }else if(error.code == 'auth/wrong-password'){
          toast.setMessage('Senha incorreta');
        }
        toast.present();
      }) ;
    }
  }
}
