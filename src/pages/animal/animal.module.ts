import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnimalPage } from './animal';
import { AnimalModalDetailsPage } from '../animal-modal-details/animal-modal-details';

@NgModule({
  declarations: [
    AnimalPage,
    AnimalModalDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AnimalPage),
  ],
  entryComponents: [
    AnimalPage,
    AnimalModalDetailsPage,
    AnimalPage,
    AnimalModalDetailsPage,
  ],
})
export class AnimalPageModule {}
