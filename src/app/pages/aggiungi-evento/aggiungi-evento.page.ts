import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from "../../model/user.model";

@Component({
  selector: 'app-aggiungi-evento',
  templateUrl: './aggiungi-evento.page.html',
  styleUrls: ['./aggiungi-evento.page.scss'],
})
export class AggiungiEventoPage implements OnInit {
  dates = [];
  eventForm: FormGroup;
  user: User;

  constructor(
    public authService: AuthenticationService,
    public dataService: DataService,
    public router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.eventForm = this.fb.group({
      title: [''],
      description: [''],
      city: [''],
      address: [''],
      category: [''],
      tags: [''],
      date: [''],
      username: ['']
    });
  }
  addDate(date){
    this.dates.push(date.value);
    console.log(this.dates);
  }
  createEvent(){
    this.eventForm.value.date= this.dates;
    this.dataService.getUserByEmail(this.authService.getCurrentUser()).subscribe(res => {
      this.user =res.pop();
      this.eventForm.value.username= this.user.username;
      this.dataService.createEvent(this.eventForm.value);
      this.router.navigateByUrl('/event-list',{replaceUrl:true});
    });
  }
}
