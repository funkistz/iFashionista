import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';

import {CreateItem} from '../create-item/create-item';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  outfit: string = "events";
  createItemPage = CreateItem;

  newsData: any =[];
  loading: any=[];
  products: FirebaseListObservable<any>;

  tags: FirebaseListObservable<any>;
  colors: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public aDB: AngularFireDatabase
  ) {

    this.loadProduct();
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
      this.products = this.aDB.list('/products', {query: {orderByChild : filterby+"/"+filter, equalTo:true}});
    }

    loading.dismiss();
  }

  addItem(){
    this.navCtrl.push(CreateItem);
  }

  editProduct(product){
    this.navCtrl.push(CreateItem, {
      key: product.$key,
      name: product.name,
      price: product.price,
      description: product.description,
      thumbnail: product.thumbnail,
      tags: product.tags,
      colors: product.colors
    });
  }

  removeProduct(songId: string){
    this.products.remove(songId);

    let toast = this.toastCtrl.create({
      message: 'Product was deleted successfully',
      duration: 2000
    });
    toast.present();
  }

  filterProduct(value, filterby){

    // set q to the value of the searchbar
    var q = value;

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
