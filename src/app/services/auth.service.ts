import { Injectable ,NgZone} from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';


import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})

export class AuthService {


  constructor(
    private auth: Auth,
    public router: Router,
    public ngZone: NgZone
  ) {

  }
 //qui si usano le promise
  async register({email, password}) {
    try {
      const user = await  createUserWithEmailAndPassword(this.auth, email, password);
      return user;
    }
    catch (e){
      return null;
    }
  }
  async login({email, password}) {
    try {
      const user = await signInWithEmailAndPassword(this.auth,email, password);
      return user;
    }
    catch (e){
      return null;
    }

  }



  logout() {
   return signOut(this.auth);
  }




}
