import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  credentials: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) { }

  getEmail(){
    return this.credentials.get('email');
  }

  getPassword(){
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.formBuilder.group(
      {
        email: ['',[Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      }
    );
    
  }
  async register() {
    const loading= await this.loadingController.create();
    await loading.present();
    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();
    if(user){
      this.router.navigateByUrl('/home', {replaceUrl: true});
    }
    else {
      this.showAlert('Registration Failed', 'Try Again');

    }
  }
  async showAlert(header, message){
    const alert = await this.alertController.create(
      {
        header,
        message,
        buttons: ['OK'],
      }
    );

    await alert.present();

  }


}
