import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BezerroModalDetailsPage } from './bezerro-modal-details';

@NgModule({
  declarations: [
    BezerroModalDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BezerroModalDetailsPage),
  ],
})
export class BezerroModalDetailsPageModule {}
