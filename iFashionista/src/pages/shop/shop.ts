import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import {ProductInfoPage} from '../product-info/product-info';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {

  loading: any=[];
  products: FirebaseListObservable<any>;

  tags: FirebaseListObservable<any>;
  colors: FirebaseListObservable<any>;

  event:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public aDB: AngularFireDatabase
  ) {

    let event = this.navParams.get('event');

    if(!event){
      this.event = 'all';
    }else{
      this.event = event;
    }

    this.filterProduct( this.event , 'tags');

    this.tags = aDB.list('/tag');
    this.colors = aDB.list('/colors');

  }

  loadProduct(filter=false, filterby=""){

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    if(!filter){
      this.products = this.aDB.list('/products');
    }else{
      console.log(filterby+"/"+filter);
      this.products = this.aDB.list('/products', {query: {orderByChild : filterby+"/"+filter, equalTo:true}});
    }

    loading.dismiss();
  }

  productInfo(product){
    this.navCtrl.push(ProductInfoPage, {
      key: product.$key,
      name: product.name,
      price: product.price,
      description: product.description,
      thumbnail: product.thumbnail,
      tags: product.tags,
      colors: product.colors
    });
  }

  filterProduct(value, filterby){

    // set q to the value of the searchbar
    var q = value;

    console.log(value+"/"+filterby);

    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }else if(q=="all"){
      this.loadProduct();
    }else{
      this.loadProduct(q, filterby);
    }

  }

}
