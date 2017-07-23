import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateItem } from './create-item';

@NgModule({
  declarations: [
    CreateItem,
  ],
  imports: [
    IonicPageModule.forChild(CreateItem),
  ],
  exports: [
    CreateItem
  ]
})
export class CreateItemModule {}
