import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Outfit } from './outfit';

@NgModule({
  declarations: [
    Outfit,
  ],
  imports: [
    IonicPageModule.forChild(Outfit),
  ],
  exports: [
    Outfit
  ]
})
export class OutfitModule {}
