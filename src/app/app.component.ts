import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  constructor(
    private router: Router,
    private authService: AuthService) {}

    async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('/', {replaceUrl: true});
    }


}
