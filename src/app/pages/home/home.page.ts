import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ProfilePhotoService } from 'src/app/services/profile-photo.service';
import {DataService} from '../../services/data.service';
import firebase from 'firebase/compat';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage  {
  profile =null;
  eventi=[];
  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService,
    private alertCtrl: AlertController
  ) {
    this.dataService.getEvent().subscribe(res => {
      console.log(res);
      this.eventi=res;
    });
  }

  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('/', {replaceUrl: true});
  }

  async dettaglioEvento(evento){
    this.router.navigateByUrl('/detail-poi', {replaceUrl: true});

  }

  async addEvento(evento){
    this.dataService.addEvent(evento);
  }




}
