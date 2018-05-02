import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BezerroAddPage } from './bezerro-add';

@NgModule({
  declarations: [
    BezerroAddPage,
  ],
  imports: [
    IonicPageModule.forChild(BezerroAddPage),
  ],
})
export class BezerroAddPageModule {}
