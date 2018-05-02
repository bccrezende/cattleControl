import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VacinaAddPage } from './vacina-add';

@NgModule({
  declarations: [
    VacinaAddPage,
  ],
  imports: [
    IonicPageModule.forChild(VacinaAddPage),
  ],
})
export class VacinaAddPageModule {}
