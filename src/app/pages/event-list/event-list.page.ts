import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../model/user.model';

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
  ) {}
  deleteEvent(id){
    return this.dataService.deleteEvent(id);
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
