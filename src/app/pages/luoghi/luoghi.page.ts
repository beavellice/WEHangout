import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../model/user.model';

@Component({
  selector: 'app-luoghi',
  templateUrl: './luoghi.page.html',
  styleUrls: ['./luoghi.page.scss'],
})
export class LuoghiPage implements OnInit {
  events =[];
  user: User;

  constructor(
    private dataService: DataService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.dataService.getUserByEmail(this.authService.getCurrentUser()).subscribe(res => {
      this.user =res.pop();
      this.dataService.getEventsByPlace('Luogo',this.user.city).subscribe(res2 =>{
        this.events = res2;
      });
    });
  }

}
