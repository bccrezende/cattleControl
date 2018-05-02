import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BoiAddPage } from './boi-add';

@NgModule({
  declarations: [
    BoiAddPage,
  ],
  imports: [
    IonicPageModule.forChild(BoiAddPage),
  ],
})
export class BoiAddPageModule {}
