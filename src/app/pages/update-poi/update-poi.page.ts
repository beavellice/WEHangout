import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {DataService} from '../../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../model/user.model';
import {Event} from '../../model/event.model';
import {element} from 'protractor';
import {DatePipe} from '@angular/common';
import {LoadingController, ToastController} from '@ionic/angular';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {ImageService} from '../../services/image.service';

@Component({
  selector: 'app-update-poi',
  templateUrl: './update-poi.page.html',
  styleUrls: ['./update-poi.page.scss'],
})
export class UpdatePoiPage implements OnInit {
  date = [];
  event=[];
  eventForm: FormGroup;
  user: User;
  formatDate: string;
  first: boolean;
  datepipe: DatePipe = new DatePipe('en-US');

  constructor(
    public authService: AuthenticationService,
    public dataService: DataService,
    public router: Router,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private imageService: ImageService,
    public fb: FormBuilder
  ) { this.first=true;}

  ngOnInit() {
    const id = this.route.snapshot.queryParamMap.get('id');
    this.dataService.getEventByID(id).subscribe( res2 => {
      this.event= res2;
      if (this.first) {
        if (this.event['dates']) {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          this.formatDate = this.event['dates'].forEach(element =>
            this.date.push(element));
          this.first = false;
        }
      }
      console.log(this.event);

    });
    this.eventForm = this.fb.group({
      id: [''],
      title: [''],
      description: [''],
      city: [''],
      address: [''],
      category: [''],
      tags: [''],
      username: ['']
    });
  }
  deleteDates(){
    const id = this.route.snapshot.queryParamMap.get('id');
    this.date= [];
    return this.dataService.deleteDates(id);
  }
  async addDate(date, time) {
    const id = this.route.snapshot.queryParamMap.get('id');
    this.formatDate = this.datepipe.transform(date.value, 'dd/MM/YYYY');
    if(time.value){
      this.formatDate = this.formatDate.concat(', ', time.value);
    }
    this.date.push(this.formatDate);
    await this.dataService.updateDateEvent(id, this.date);
    const toast = await this.toastController.create({
      message: 'Date added!',
      duration: 1500,
      position: 'bottom'
    });
    await toast.present();
  }

  async uploadImage(){
    const id = this.route.snapshot.queryParamMap.get('id');
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });
    if (image){
      const loading = await this.loadingController.create();
      await loading.present;
      const result = await this.imageService.updateUploadImage(this.eventForm.value.title, id,image);
      loading.dismiss();
    }
  }

  updateEvent(){
    this.dataService.getUserByEmail(this.authService.getCurrentUser()).subscribe(res => {
      this.user =res.pop();
      this.eventForm.value.username= this.user.username;
      this.dataService.updateEvent(this.eventForm.value);
        this.router.navigateByUrl('/event-list',{replaceUrl:true});
    });
  }
}
