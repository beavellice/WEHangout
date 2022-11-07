/* eslint-disable @typescript-eslint/member-ordering */
import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore,} from '@angular/fire/compat/firestore';
import {getAuth, onAuthStateChanged} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})


export class AuthenticationService {
  userData: any;
  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    /*
    this.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
     */
  }
  // Login in with email/password
  signIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }
  // Register user with email/password
  registerUser(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }
  getCurrentUser(){
    const at  = getAuth();
    const user = at.currentUser;
   return user.email;
  }



  // Store user in localStorage

  // Sign-out
  async signOut() {
    await this.ngFireAuth.signOut();
    //localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}
