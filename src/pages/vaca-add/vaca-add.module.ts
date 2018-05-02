import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VacaAddPage } from './vaca-add';

@NgModule({
  declarations: [
    VacaAddPage,
  ],
  imports: [
    IonicPageModule.forChild(VacaAddPage),
  ],
})
export class VacaAddPageModule {}
