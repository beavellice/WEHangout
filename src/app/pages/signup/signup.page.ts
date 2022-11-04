import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {User} from '../../model/user.model';

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
    public user: User,
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
        this.router.navigateByUrl('/home',{replaceUrl:true});
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  //creo lo user da mettere nel db
  makeUser() {
    if (!this.userForm.valid) {
      return false;
    } else {
      this.user.username = this.userForm.value.username;

    }
    /*
    if (!this.userForm.valid) {
      return false;
    } else {
      this.aptUser
        .createUser(this.userForm.value)
        .then((res) => {
          console.log(res);
          this.userForm.reset();
          this.router.navigate(['/tabs']);
        })
        .catch((error) => console.log(error));
    }*/
  }

}
