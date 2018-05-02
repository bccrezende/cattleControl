import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VacaModalDetailsPage } from './vaca-modal-details';

@NgModule({
  declarations: [
    VacaModalDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(VacaModalDetailsPage),
  ],
})
export class VacaModalDetailsPageModule {}
