import {Injectable} from '@angular/core';

import {Firestore, collectionData, addDoc, query, where} from '@angular/fire/firestore';
import {collection, Query} from '@firebase/firestore';
import {User} from '../model/user.model';
import {Event} from '../model/event.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private firestore: Firestore) {}
  getUser() {
    const userRef = collection(this.firestore, 'user');
    return collectionData(userRef, {idField: 'id'});
  }
  getEventsByCity(city: string): Observable<any> {
    const q = query(collection(this.firestore, 'evento'), where('city','==',city));
    return collectionData(q,{idField: 'id'}) as Observable<any>;
  }
  getEventsByUser(username: string): Observable<any> {
    const q = query(collection(this.firestore, 'evento'), where('username', '==', username));
    return collectionData(q) as Observable<any>;
  }
  getUserByEmail(email: string): Observable<any[]>{
    const q = query(collection(this.firestore, 'user'), where('email', '==', email));
    return collectionData(q) as Observable<any[]>;
  }


  createUser(user: User){
    const userRef = collection(this.firestore, 'user');
    return addDoc(userRef, user);
  }

  createEvent(event: Event){
    const eventRef = collection(this.firestore, 'evento');
    return addDoc(eventRef, event);
  }

}
