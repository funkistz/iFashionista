import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventInfo } from './event-info';

@NgModule({
  declarations: [
    EventInfo,
  ],
  imports: [
    IonicPageModule.forChild(EventInfo),
  ],
  exports: [
    EventInfo
  ]
})
export class EventInfoModule {}
