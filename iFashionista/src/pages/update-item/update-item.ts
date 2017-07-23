import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { AngularFireDatabaseModule } from 'angularfire2/database';

/**
 * Generated class for the UpdateItem page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-update-item',
  templateUrl: 'update-item.html',
})
export class UpdateItem {

  product_id;

  products : FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, aDB: AngularFireDatabase) {

    this.product_id = navParams.get('product_id');

    this.products = aDB.list('/products', {query: {
      orderByChild: 'uid',
      equalTo: this.product_id
    }});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateItem');
  }

}
