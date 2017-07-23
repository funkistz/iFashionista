import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController  } from 'ionic-angular';

import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {

  base64Image;

  eventList : FirebaseListObservable<any>;
  event = {
    id: '',
    name: '',
    description: '',
    thumbnail: '',
  };

  product_image_url;

  img_original:String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public toastCtrl: ToastController, private imagePicker: ImagePicker,
    public camera: Camera, public aDB: AngularFireDatabase) {

      this.eventList = aDB.list('/tag');

      this.event.id = this.navParams.get('key');
      this.event.name = this.navParams.get('name');
      this.event.description = this.navParams.get('description');
      this.event.thumbnail = this.navParams.get('thumbnail');

      this.img_original = this.navParams.get('thumbnail');

  }

  submitEvent(){

    if(this.event.name && this.event.description ){

      if(this.event.id) {

        this.updateEvent();
      } else {

        if(this.captureDataUrl != null && this.captureDataUrl != ''){
          this.addEvent();
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

  addEvent(){

    let loading = this.loadingCtrl.create({
      content: 'Adding Event...'
    });

    loading.present();

    this.eventList.update(this.event.name, {

      name: this.event.name,
      description: this.event.description,

    }).then( item => {

      loading.dismiss();

      this.event.id = this.event.name;

      if(this.captureDataUrl){

        this.upload(this.event.name);
      }

    }, error => {
        console.log(error);
    });

  }

  updateEvent(){

    let loading = this.loadingCtrl.create({
      content: 'Updating Event...'
    });

    loading.present();

    this.eventList.update(this.event.id, {

      name: this.event.name,
      description: this.event.description,

    }).then( newProduct => {

      loading.dismiss();

      if(this.captureDataUrl){

        this.upload(this.event.name);
      }else{
        let toast = this.toastCtrl.create({
          message: 'Event was updated successfully',
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

    this.eventList.update(id, {

      thumbnail: this.product_image_url,

    }).then( newProduct => {

      loading.dismiss();

      let toast = this.toastCtrl.create({
        message: 'Successfull',
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

    this.product_image_url = "https://firebasestorage.googleapis.com/v0/b/ifashionista-95e36.appspot.com/o/product_images%2F"+this.event.id+"%2F"+filename+".jpg?alt=media";

    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {

      loading.dismiss();
      this.updateProductImage(image_name);
    });
  }



}
