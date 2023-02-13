import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Follower} from '../../model/follower.model';

@Component({
  selector: 'app-seguiti',
  templateUrl: './seguiti.page.html',
  styleUrls: ['./seguiti.page.scss'],
})
export class SeguitiPage implements OnInit {
  followers=[];
  users=[];
  constructor(
    private dataService: DataService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {

    this.dataService.getFollowers(this.authService.getCurrentUser()).subscribe(res =>{
      this.users=[];
    this.followers = res;
      this.followers.forEach(res2 =>{
        this.dataService.getUserByEmail(res2.user).subscribe(res3 =>{
          this.users.push(res3);
          console.log(res3);
        });
      });
    });

    /*this.followers.forEach(res2 => {

    });*/


  }

}
