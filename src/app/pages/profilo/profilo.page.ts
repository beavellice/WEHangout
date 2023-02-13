import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user.model';
import {DataService} from '../../services/data.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.page.html',
  styleUrls: ['./profilo.page.scss'],
})
export class ProfiloPage implements OnInit {
  user= [];
  followers: any;
  password: any;
  email: any;


  constructor(
    private dataService: DataService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.dataService.getUserByEmail(this.authService.getCurrentUser()).subscribe(res => {
      this.user=res.pop();
    });
    //console.log(this.user);
    this.dataService.countFollowers(this.authService.getCurrentUser()).then(res => {
      this.followers = res;
      console.log(res);
    });
  }
}
