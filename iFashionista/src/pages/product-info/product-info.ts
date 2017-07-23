import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController  } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import {Outfit} from '../outfit/outfit';

@IonicPage()
@Component({
  selector: 'page-product-info',
  templateUrl: 'product-info.html',
})
export class ProductInfoPage {

  productList : FirebaseListObservable<any>;
  product = {
    id: '',
    name: '',
    price: '',
    description: '',
    thumbnail: '',
    tags: [],
    colors: [],
  };

  outfitView:String;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public aDB: AngularFireDatabase,
    afAuth: AngularFireAuth
  )
  {
    const authObserver = afAuth.authState.subscribe( user => {
        this.productList = aDB.list('/'+user.uid+'/products');
        authObserver.unsubscribe();
    });

    this.product.id = this.navParams.get('key');
    this.product.name = this.navParams.get('name');
    this.product.price = this.navParams.get('price');
    this.product.description = this.navParams.get('description');
    this.product.thumbnail = this.navParams.get('thumbnail');

    this.outfitView = this.navParams.get('outfitView')

    let tag = this.navParams.get('tags');
    let arr = [];

    for(let key in tag){
       if(tag.hasOwnProperty(key)){
          arr.push(key);
       }
    }

    this.product.tags = arr;

    let color = this.navParams.get('colors');
    let arr2 = [];

    for(let key in color){
       if(color.hasOwnProperty(key)){
          arr2.push(key);
       }
    }

    this.product.colors = arr2;
  }

  addOutfit() {
    this.addProduct();
    this.navCtrl.pop();
  }

  addProduct(){

    let loading = this.loadingCtrl.create({
      content: 'Adding Product to Outfits...'
    });

    loading.present();

    this.productList.push({

      name: this.product.name,
      price: this.product.price,
      description: this.product.description,
      thumbnail: this.product.thumbnail,
      tags: this.product.tags.reduce(function(result, item) {
        result[item] = true; //a, b, c
        return result;
      }, {}),
      colors: this.product.colors.reduce(function(result, item) {
        result[item] = true; //a, b, c
        return result;
      }, {})

    }).then( item => {

      loading.dismiss();

      let toast = this.toastCtrl.create({
        message: 'Product was added to outfits',
        duration: 2000
      });
      toast.present();

    }, error => {
        console.log(error);
    });

  }

}
