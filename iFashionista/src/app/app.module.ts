import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AuthProvider } from '../providers/auth';

import { Login } from '../pages/login/login';
import { ResetPassword } from '../pages/reset-password/reset-password';
import { Signup } from '../pages/signup/signup';
import { ShopPage } from '../pages/shop/shop';
import { ProductInfoPage } from '../pages/product-info/product-info';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CreateItem } from '../pages/create-item/create-item';
import { Outfit } from '../pages/outfit/outfit';
import { EventPage } from '../pages/event/event';
import { ProductList } from '../pages/product-list/product-list';
import { EventInfo } from '../pages/event-info/event-info';
import { AddEventPage } from '../pages/add-event/add-event';
import { EventCardPage } from '../pages/event-card/event-card';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';

import { HttpModule  } from '@angular/http';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { Keys } from './objectToArray.pipe';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyCcoOj1KsStetX38kw5Bs-PG2s3XGMziOg",
  authDomain: "ifashionista-95e36.firebaseapp.com",
  databaseURL: "https://ifashionista-95e36.firebaseio.com",
  projectId: "ifashionista-95e36",
  storageBucket: "ifashionista-95e36.appspot.com",
  messagingSenderId: "409246325691"
};

@NgModule({
  declarations: [
    MyApp,
    ShopPage,
    ProductInfoPage,
    HomePage,
    TabsPage,
    CreateItem,
    Login,
    ResetPassword,
    Signup,
    Outfit,
    EventPage,
    AddEventPage,
    EventCardPage,
    EventInfo,
    ProductList,
    Keys,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShopPage,
    ProductInfoPage,
    HomePage,
    TabsPage,
    CreateItem,
    Login,
    ResetPassword,
    Signup,
    Outfit,
    Signup,
    EventPage,
    AddEventPage,
    EventCardPage,
    EventInfo,
    ProductList
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    Camera,
    AuthProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
