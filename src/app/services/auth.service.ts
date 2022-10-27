import { Injectable ,NgZone} from '@angular/core';

import {AngularFirestore} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, Auth} from '@angular/fire/auth';
import firebase from 'firebase/compat';



@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(

    public authentication: Auth,
    public router: Router

  ) {}

 //qui si usano le promise

  async register({email,password}){
    try {
      const user = await createUserWithEmailAndPassword(
        this.authentication,
        email,
        password
      );
      return user;
    } catch (e){
      return null;
    }

  }

  async login({email, password}) {
   try {
     const user = await signInWithEmailAndPassword(
       this.authentication,
       email,
       password
     );
     return user;
   } catch (e){
     return null;
   }
  }

  async logout() {
    return  this.authentication.signOut();
  }

}
