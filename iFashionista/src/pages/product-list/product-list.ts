import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductList {

  products: FirebaseListObservable<any>;
  title:String;
  colors: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public aDB: AngularFireDatabase
  ) {

    let tag = this.navParams.get('tag');

    if( tag == "all" ){
      this.products = this.aDB.list('/products');
    }else{
      this.products = this.aDB.list('/products', {query: {orderByChild : "tags/" + this.navParams.get('tag'), equalTo:true}});
    }
    this.title = this.navParams.get('tag');
    this.colors = aDB.list('/colors');
  }

  filterProduct(value, filterby){

  }

}
