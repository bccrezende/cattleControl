import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BoiModalDetailsPage } from './boi-modal-details';

@NgModule({
  declarations: [
    BoiModalDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BoiModalDetailsPage),
  ],
})
export class BoiModalDetailsPageModule {}
