import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';

import { AddEventPage } from '../add-event/add-event';
import { EventInfo } from '../event-info/event-info';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
  selector: 'page-event-card',
  templateUrl: 'event-card.html',
})
export class EventCardPage {

  eventList: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public aDB: AngularFireDatabase
  ) {

      this.eventList = this.aDB.list('/tag', {query: {orderByChild : 'temp', equalTo:null}});
  }

  eventInfo(event){
    this.navCtrl.push(EventInfo, {
      key: event.$key,
      name: event.name,
      description: event.description,
      thumbnail: event.thumbnail,
    });
  }

}
