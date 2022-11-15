import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../model/user.model';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})
export class EventListPage implements OnInit {
  events =[];
  user: User;

  constructor(
    private dataService: DataService,
    private authService: AuthenticationService,
    private alertController: AlertController
  ) {}
  async deleteEvent(id) {
    const alert = await this.alertController.create({
      header: 'Do you want to delete the selected item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => this.dataService.deleteEvent(id),
        },
      ],
    });
    await alert.present();
  }

  ngOnInit() {
    this.dataService.getUserByEmail(this.authService.getCurrentUser()).subscribe(res => {
      this.user =res.pop();
      this.dataService.getEventsByUser(this.user.username).subscribe(res2 =>{
        this.events = res2;
      });
    });
  }

}
