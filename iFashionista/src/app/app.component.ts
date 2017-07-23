import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuController, Nav, LoadingController, Loading, AlertController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';
import { EventPage } from '../pages/event/event';
import { AuthProvider } from '../providers/auth';

import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any;
  pages: Array<{title: string, component: any}>;
  loading:Loading;
  users: FirebaseListObservable<any>;
  user = {
    id: '',
    email: '',
    type: '',
  };

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public menu: MenuController,
    afAuth: AngularFireAuth,
    public authData: AuthProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public aDB: AngularFireDatabase
  ) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      const authObserver = afAuth.authState.subscribe( user => {
        if (user) {

          aDB.list('/users', {query: {
            orderByChild : "email",
            equalTo: user.email,
            limitToFirst: 1
          }}).subscribe(
            userx => {

              console.log(userx[0].type);
              if(userx[0].type == 'admin'){

                this.pages = [
                  { title: 'Admin', component: HomePage },
                  { title: 'Customer', component: TabsPage },
                  { title: 'Event', component: EventPage },
                ];
                this.rootPage = HomePage;
              }else{

                this.pages = [];
                this.rootPage = TabsPage;
              }
            }
          );

          authObserver.unsubscribe();
        } else {
          this.rootPage = Login;
          authObserver.unsubscribe();
        }
      });

      const firebaseConfig = {
        apiKey: "AIzaSyCcoOj1KsStetX38kw5Bs-PG2s3XGMziOg",
        authDomain: "ifashionista-95e36.firebaseapp.com",
        databaseURL: "https://ifashionista-95e36.firebaseio.com",
        projectId: "ifashionista-95e36",
        storageBucket: "ifashionista-95e36.appspot.com",
        messagingSenderId: "409246325691"

      };
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
    });

  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  logOut() {
    this.authData.logoutUser()
    .then( authData => {
      this.menu.close();
      this.nav.setRoot(Login);
    }, error => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });

    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();
  }

}
