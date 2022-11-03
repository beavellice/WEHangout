import {Injectable} from '@angular/core';

import {Firestore,collectionData} from '@angular/fire/firestore';
import {collection} from '@firebase/firestore';

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
}
