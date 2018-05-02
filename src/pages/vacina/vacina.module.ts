import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VacinaPage } from './vacina';

@NgModule({
  declarations: [
    VacinaPage,
  ],
  imports: [
    IonicPageModule.forChild(VacinaPage),
  ],
})
export class VacinaPageModule {}
