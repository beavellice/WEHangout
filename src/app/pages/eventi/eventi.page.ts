import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../model/user.model';
import {AlertController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-eventi',
  templateUrl: './eventi.page.html',
  styleUrls: ['./eventi.page.scss'],
})
export class EventiPage implements OnInit {
  events =[];
  user: User;

  constructor(
    private dataService: DataService,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private route: ActivatedRoute
  ) {}
  async deleteEvent(id) {
    const alert = await this.alertController.create({
      header: 'Delete',
      message: 'Do you want to delete the selected item?',
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
    const tag = this.route.snapshot.queryParamMap.get('tag');
    this.dataService.getUserByEmail(this.authService.getCurrentUser()).subscribe(res => {
      this.user =res.pop();
      this.dataService.getEventsByTags('Evento',tag,this.user.city).subscribe(res2 =>{
        this.events = res2;
      });
    });
  }

}
