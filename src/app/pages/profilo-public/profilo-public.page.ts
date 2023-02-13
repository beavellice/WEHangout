import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../services/data.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Follower} from '../../model/follower.model';
import {User} from '../../model/user.model';


@Component({
  selector: 'app-profilo-public',
  templateUrl: './profilo-public.page.html',
  styleUrls: ['./profilo-public.page.scss'],
})
export class ProfiloPublicPage implements OnInit {
 user = [];
 follower: [];
 disabled: boolean;



 constructor(
   private router: Router,
   private route: ActivatedRoute,
   private dataService: DataService,
   public auth: AuthenticationService)
 {

 }

  ngOnInit() {
    const userm= this.route.snapshot.queryParamMap.get('user');
    this.dataService.getUserByEmail(userm).subscribe(res => {
      this.user=res.pop();
    });
    this.dataService.isFollower(userm, this.auth.getCurrentUser()).then(res => {
      this.disabled = res;
      console.log(this.disabled);
    });

  }
  follow(){
    this.dataService.getUserByEmail(this.user['email']).subscribe( res => {
     this.follower= res;
      this.dataService.createFollower({user: this.user['email'], follower:this.auth.getCurrentUser()});
      this.router.navigateByUrl('/seguiti', {replaceUrl: true});
    });
  }
  unfollow(){
   this.dataService.unfollowQ(this.user['email'], this.auth.getCurrentUser()).subscribe( res => {
        res.forEach(res2 =>{
          this.dataService.unfollow(res2.id).then();
          this.router.navigateByUrl('/seguiti', {replaceUrl: true});
        });
     }
   );
  }


}
