import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InseminacaoAddPage } from './inseminacao-add';

@NgModule({
  declarations: [
    InseminacaoAddPage,
  ],
  imports: [
    IonicPageModule.forChild(InseminacaoAddPage),
  ],
})
export class InseminacaoAddPageModule {}
