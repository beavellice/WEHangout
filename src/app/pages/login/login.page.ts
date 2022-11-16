import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public authService: AuthenticationService,
              public router: Router,
              private alertController: AlertController) { }

  ngOnInit() {}

  logIn(email, password) {
    this.authService
      .signIn(email.value, password.value)
      .then((res) => {
        this.router.navigateByUrl('/home', {replaceUrl: true});
      })
      .catch(async (error) => {
        const alert2 = await this.alertController.create({
          header: 'Error',
          subHeader: 'Mail or Password Wrong',
          message: 'Try again',
          buttons: ['OK'],
        });
        await alert2.present();
      });
  }
}
