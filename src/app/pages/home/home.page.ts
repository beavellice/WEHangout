import { Component } from '@angular/core';
import {DataService} from '../../services/data.service';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../model/user.model';
import {Event} from '../../model/event.model';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  events =[];
  event: Event;
  user: User;



  constructor(
    private dataService: DataService,
    private authService: AuthenticationService,
  )
  {
    this.dataService.getUserByEmail(this.authService.getCurrentUser()).subscribe(res => {
        this.user =res.pop();
        this.dataService.getEventsByCity(this.user.city).subscribe(res2 =>{
          this.events = res2;
        });
    });
    this.dataService.getEventsByCity('Roma').subscribe( res =>{
       console.log(res);
    });
  }

}
