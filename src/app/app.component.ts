import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nativeStorage: NativeStorage,
    private navCtrl: NavController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    if (this.platform.is('cordova')) {
      this.nativeStorage.getItem('username')
        .then(
          data => this.navCtrl.navigateRoot('home'),
          error => this.navCtrl.navigateRoot('login')
        );
    } else {
      const username: string = localStorage.getItem('username');
      if (username) {
        this.navCtrl.navigateRoot('home');
      } else {
        this.navCtrl.navigateRoot('login');
      }
    }
  }
}
