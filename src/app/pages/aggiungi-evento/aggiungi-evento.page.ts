import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../model/user.model';
import {DatePipe} from '@angular/common';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-aggiungi-evento',
  templateUrl: './aggiungi-evento.page.html',
  styleUrls: ['./aggiungi-evento.page.scss'],
})
export class AggiungiEventoPage implements OnInit {
  dates1 = [];
  datetimes = [];
  eventForm: FormGroup;
  user: User;
  a: string;
  datepipe: DatePipe = new DatePipe('en-US');

  constructor(
    public authService: AuthenticationService,
    public dataService: DataService,
    public router: Router,
    private toastController: ToastController,
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
      dates: [''],
      datestime: [''],
      username: ['']
    });
  }
  async addDate(date, time) {
    this.a = this.datepipe.transform(date.value, 'dd/MM/YYYY');
    this.a = this.a.concat(', ', time.value);
    this.dates1.push(date.value);
    this.datetimes.push(this.a);
    const toast = await this.toastController.create({
      message: 'Date added!',
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
    console.log(this.dates1);
    console.log(this.datetimes);
  }
  createEvent(){
    this.eventForm.value.dates= this.dates1;
    this.eventForm.value.datestime= this.datetimes;
    this.dataService.getUserByEmail(this.authService.getCurrentUser()).subscribe(res => {
      this.user =res.pop();
      this.eventForm.value.username= this.user.username;
      this.dataService.createEvent(this.eventForm.value);
      this.router.navigateByUrl('/event-list',{replaceUrl:true});
    });
  }
}
