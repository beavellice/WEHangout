import {Injectable} from '@angular/core';

import {Firestore, collectionData, addDoc} from '@angular/fire/firestore';
import {collection} from '@firebase/firestore';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private firestore: Firestore) {}
  getUser() {
    const userRef = collection(this.firestore, 'user');
    return collectionData(userRef);
  }
  getEvents() {
    const eventsRef = collection(this.firestore, 'evento');
    return collectionData(eventsRef);
  }
  createUser(user: User){
    const userRef = collection(this.firestore, 'user');
    return addDoc(userRef, user );
  }
}
