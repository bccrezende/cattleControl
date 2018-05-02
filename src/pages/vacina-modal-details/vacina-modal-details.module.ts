import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VacinaModalDetailsPage } from './vacina-modal-details';

@NgModule({
  declarations: [
    VacinaModalDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(VacinaModalDetailsPage),
  ],
})
export class VacinaModalDetailsPageModule {}
