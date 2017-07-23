import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController  } from 'ionic-angular';

import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'page-create-item',
  templateUrl: 'create-item.html',
})
export class CreateItem {
  base64Image;

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

  tags: FirebaseListObservable<any>;
  colors: FirebaseListObservable<any>;
  product_image_url;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public toastCtrl: ToastController, private imagePicker: ImagePicker,
    public camera: Camera, public aDB: AngularFireDatabase) {

    this.productList = aDB.list('/products');

    this.product.id = this.navParams.get('key');
    this.product.name = this.navParams.get('name');
    this.product.price = this.navParams.get('price');
    this.product.description = this.navParams.get('description');
    this.product.thumbnail = this.navParams.get('thumbnail');

    let tag = this.navParams.get('tags');
    let arr = [];

    for(let key in tag){
     if(tag.hasOwnProperty(key)){
       arr.push(key);
     }
    }

    this.product.tags = arr;

    this.tags = aDB.list('/tag', {query: {orderByChild : "temp", equalTo:null}});

    let color = this.navParams.get('colors');
    let arr2 = [];

    for(let key in color){
     if(color.hasOwnProperty(key)){
       arr2.push(key);
     }
    }

    this.product.colors = arr2;

    this.colors = aDB.list('/colors', {query: {orderByChild : "temp", equalTo:null}});

  }

  submitProduct(){

    if(this.product.name && this.product.price ){

      if(this.product.id) {

        this.updateProduct();
      } else {

        if(this.captureDataUrl != null && this.captureDataUrl != ''){
          this.addProduct();
        }else{
          let toast = this.toastCtrl.create({
            message: 'Please select an image',
            duration: 2000
          });
          toast.present();
        }
      }

    }else{
      let toast = this.toastCtrl.create({
        message: 'Please fill all required input (*)',
        duration: 2000
      });
      toast.present();
    }

  }

  addProduct(){

    let loading = this.loadingCtrl.create({
      content: 'Adding Product...'
    });

    loading.present();

    this.productList.push({

      name: this.product.name,
      price: this.product.price,
      description: this.product.description,
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

      if(this.captureDataUrl){
        this.upload(item.key);
      }

    }, error => {
        console.log(error);
    });

  }

  updateProduct(){

    let loading = this.loadingCtrl.create({
      content: 'Updating Product...'
    });

    loading.present();

    this.productList.update(this.product.id, {

      name: this.product.name,
      price: this.product.price,
      description: this.product.description,
      tags: this.product.tags.reduce(function(result, item) {
        result[item] = true; //a, b, c
        return result;
      }, {}),
      colors: this.product.colors.reduce(function(result, item) {
        result[item] = true; //a, b, c
        return result;
      }, {})

    }).then( newProduct => {

      loading.dismiss();

      if(this.captureDataUrl){

        this.upload(this.product.id);
      }else{
        let toast = this.toastCtrl.create({
          message: 'Successfull',
          duration: 2000
        });
        toast.present();
      }

      this.navCtrl.pop();
    }, error => {
      console.log(error);
    });

  }

  updateProductImage(id){

    let loading = this.loadingCtrl.create({
      content: 'Uploading Image...'
    });

    loading.present();

    this.productList.update(id, {

      thumbnail: this.product_image_url,

    }).then( newProduct => {

      loading.dismiss();

      let toast = this.toastCtrl.create({
        message: 'Product was added successfully',
        duration: 2000
      });
      toast.present();

      this.navCtrl.pop();

    }, error => {
      console.log(error);
    });

  }

  captureDataUrl: string;

  capture() {
    const cameraOptions: CameraOptions = {
      quality: 50,
      sourceType: 0,
      targetWidth: 450,
      targetHeight: 450,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  upload(image_name) {

    let loading = this.loadingCtrl.create({
      content: 'Uploading Image...'
    });

    loading.present();

    let storageRef = firebase.storage().ref();
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`product_images/${image_name}/${filename}.jpg`);

    this.product_image_url = "https://firebasestorage.googleapis.com/v0/b/ifashionista-95e36.appspot.com/o/product_images%2F"+this.product.id+"%2F"+filename+".jpg?alt=media";

    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {

      loading.dismiss();
      this.updateProductImage(image_name);
    });
  }

}
