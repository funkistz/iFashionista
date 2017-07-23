import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';

import {CreateItem} from '../create-item/create-item';
import {ProductInfoPage} from '../product-info/product-info';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-outfit',
  templateUrl: 'outfit.html',
})
export class Outfit {

  outfit: string = "events";
  userId: any;
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
    public aDB: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {

    afAuth.authState.subscribe( user => {
        this.userId = user.uid;
        this.loadProduct();
    });

    this.tags = aDB.list('/tag');
    this.colors = aDB.list('/colors');
  }

  loadProduct(filter=false, filterby=""){

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    if(!filter){
      console.log(this.userId);
      this.products = this.aDB.list('/'+this.userId+'/products');
    }else{
      console.log(this.userId);
      this.products = this.aDB.list('/'+this.userId+'/products', {query: {orderByChild : filterby+"/"+filter, equalTo:true}});
    }

    loading.dismiss();
  }

  addItem(){
    this.navCtrl.push(CreateItem);
  }

  productInfo(product){
    this.navCtrl.push(ProductInfoPage, {
      key: product.$key,
      name: product.name,
      price: product.price,
      description: product.description,
      thumbnail: product.thumbnail,
      tags: product.tags,
      colors: product.colors,
      outfitView: 'true'
    });
  }

  removeProduct(id: string){
    this.products.remove(id);

    let toast = this.toastCtrl.create({
      message: 'Product was removed form outfits',
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
