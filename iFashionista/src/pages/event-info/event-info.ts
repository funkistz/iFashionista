import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import {ShopPage} from '../shop/shop';

@IonicPage()
@Component({
  selector: 'page-event-info',
  templateUrl: 'event-info.html',
})
export class EventInfo {

  title:String;
  description:String;
  thumbnail:String;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public aDB: AngularFireDatabase
  ) {

    this.title = this.navParams.get('key');
    this.description = this.navParams.get('description');
    this.thumbnail = this.navParams.get('thumbnail');

    let eventName = this.title;
    switch(eventName) {
       case "all": {
          this.navCtrl.pop();
          this.navCtrl.parent.select(1);
          break;
       }
    }

  }

  productList( event ) {
    this.navCtrl.push(ShopPage, {
      event: event,
    });
  }

}
