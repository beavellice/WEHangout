import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {DataService} from '../../services/data.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  userForm: FormGroup;

  constructor(
    //private aptUser: UserService,
    public authService: AuthenticationService,
    public dataService: DataService,
    public router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      username: [''],
      email: [''],
      password: [''],
      city: ['']
    });
  }
  signUp(email, password) {
    this.authService
      .registerUser(email.value, password.value)
      .then((res) => {
        this.dataService.createUser(this.userForm.value);
        this.router.navigateByUrl('/home',{replaceUrl:true});
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }


}
