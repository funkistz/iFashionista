import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';

import { AddEventPage } from '../add-event/add-event';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {

  eventList: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public aDB: AngularFireDatabase
  ) {

      this.eventList = this.aDB.list('/tag', {query: {orderByChild : 'temp', equalTo:null}});
  }

  editEvent(event){
    this.navCtrl.push(AddEventPage, {
      key: event.$key,
      name: event.name,
      description: event.description,
      thumbnail: event.thumbnail,
    });
  }

  removeEvent(eventId: string){
    this.eventList.remove(eventId);

    let toast = this.toastCtrl.create({
      message: 'Event was deleted successfully',
      duration: 2000
    });
    toast.present();
  }

  addEvent(){
    this.navCtrl.push(AddEventPage);
  }

}
