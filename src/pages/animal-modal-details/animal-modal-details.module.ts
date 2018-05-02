import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnimalModalDetailsPage } from './animal-modal-details';

@NgModule({
  declarations: [
    AnimalModalDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AnimalModalDetailsPage),
  ],
})
export class AnimalModalDetailsPageModule {}
