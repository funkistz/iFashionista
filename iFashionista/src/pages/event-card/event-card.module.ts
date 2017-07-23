import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventCardPage } from './event-card';

@NgModule({
  declarations: [
    EventCardPage,
  ],
  imports: [
    IonicPageModule.forChild(EventCardPage),
  ],
  exports: [
    EventCardPage
  ]
})
export class EventCardPageModule {}
