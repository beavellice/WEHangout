import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ProfilePhotoService } from 'src/app/services/profile-photo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage  {

  profile=null;

  searching=false;
  constructor(

    private profService: ProfilePhotoService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.profService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
  }




}
