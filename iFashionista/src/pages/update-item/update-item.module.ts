import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateItem } from './update-item';

@NgModule({
  declarations: [
    UpdateItem,
  ],
  imports: [
    IonicPageModule.forChild(UpdateItem),
  ],
  exports: [
    UpdateItem
  ]
})
export class UpdateItemModule {}
