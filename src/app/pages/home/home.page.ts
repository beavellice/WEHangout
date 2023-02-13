import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../model/user.model';
import {Event} from '../../model/event.model';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  events= [];
  event: Event;
  user: User;
  searchField: FormControl;
  eventList= [];


  constructor(
    private dataService: DataService,
    private authService: AuthenticationService,
  )
  {
    this.searchField = new FormControl('');

  }


  ngOnInit() {
    this.totalList();
  }

  async totalList(){
    this.dataService.getUserByEmail(this.authService.getCurrentUser()).subscribe(res => {
      this.user = res.pop();
      this.dataService.getEventsByCity(this.user.city).subscribe(res2 =>{
        this.events = res2;
      });
    });
  }
  async filterList(event){
    console.log(event.value);
    if(!event.value){
      this.totalList();
      return;
    }
    this.events=[];
    this.dataService.getUserByEmail(this.authService.getCurrentUser()).subscribe(res => {
      this.user = res.pop();
      this.dataService.getEventsByCity(this.user.city).subscribe(res2 =>{
        this.eventList = res2;
        this.events = this.eventList.filter(currentEvent => {
          if(currentEvent.title && event.value){
            return (currentEvent.title.toLowerCase().indexOf(event.value.toLowerCase()) > -1);
          }
        });
        console.log(this.eventList);
      });
    });
  }


}

