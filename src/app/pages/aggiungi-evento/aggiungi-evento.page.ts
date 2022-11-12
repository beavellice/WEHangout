import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../model/user.model';
import {DatePipe} from '@angular/common';
import {ToastController} from '@ionic/angular';
import {ImageService} from '../../services/image.service';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';

@Component({
  selector: 'app-aggiungi-evento',
  templateUrl: './aggiungi-evento.page.html',
  styleUrls: ['./aggiungi-evento.page.scss'],
})
export class AggiungiEventoPage implements OnInit {
  dateTimes = [];
  eventForm: FormGroup;
  user: User;
  formatDate: string;
  url: any;
  datePipe: DatePipe = new DatePipe('en-US');

  constructor(
    public authService: AuthenticationService,
    public dataService: DataService,
    public router: Router,
    private toastController: ToastController,
    private imageService: ImageService,
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
      username: [''],
      imageUrl: [],
    });
  }
  async addDate(date, time) {
    this.formatDate = this.datePipe.transform(date.value, 'dd/MM/YYYY');
    if(time.value){
      this.formatDate = this.formatDate.concat(', ', time.value);
    }
    this.dateTimes.push(this.formatDate);
    const toast = await this.toastController.create({
      message: 'Date added!',
      duration: 1500,
      position: 'bottom'
    });
    await toast.present();
    console.log(this.dateTimes);
  }
  async uploadImage(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });
    this.imageService.uploadEventImage(this.eventForm.value.title,image).then(async (res) => {
        this.url = res;
        const toast = await this.toastController.create({
          message: 'Image Uploaded',
          duration: 1500,
          position: 'bottom'
        });
        await toast.present();
        return this.url;
      }
    );
  }
  createEvent(){
    this.eventForm.value.imageUrl = this.url;
    this.eventForm.value.dates = this.dateTimes;
    this.dataService.getUserByEmail(this.authService.getCurrentUser()).subscribe(res => {
      this.user = res.pop();
      this.eventForm.value.username= this.user.username;
      this.dataService.createEvent(this.eventForm.value);
      this.router.navigateByUrl('/event-list',{replaceUrl:true});
    });
  }
}
